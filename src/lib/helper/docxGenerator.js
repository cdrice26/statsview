import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  ImageRun
} from 'docx';
import { saveAs } from 'file-saver';
import generateStatText from './statTextGenerator';
import { generateTestText, getColumnData, getTestResults } from './testHelpers';
import {
  generateChartData,
  generateChartLayout,
  getXCol,
  rotateData
} from './chartHelpers';
// @ts-ignore
import Plotly from 'plotly.js-dist';
import { getInterval, getIntervalText } from './intervalHelpers';

/**
 * Parses HTML content into docx Paragraph objects with specified text settings.
 *
 * @param {string} html - The HTML content to parse.
 * @param {Object} settings - Text formatting settings.
 * @param {boolean} [settings.bold=false] - Whether the text should be bold.
 * @param {boolean} [settings.italic=false] - Whether the text should be italic.
 * @param {boolean} [settings.underline=false] - Whether the text should be underlined.
 * @param {string} [settings.color] - Text color.
 * @param {string} [settings.fontFamily] - Font family for the text.
 * @param {number} [settings.fontSize] - Font size.
 * @returns {Paragraph[]} An array of docx Paragraph objects.
 */
const parseHtmlToParagraphs = (html, settings) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const paragraphs = [];
  let consecutiveBrCount = 0; // Counter for consecutive <br> tags

  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.replace(/\s+/g, ' ').trim(); // Normalize whitespace
      if (text) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text,
                bold: settings.bold,
                italics: settings.italic,
                underline: settings.underline ? {} : null,
                color: settings.color,
                font: settings.fontFamily,
                size: settings.fontSize * 2
              })
            ]
          })
        );
      }
      consecutiveBrCount = 0; // Reset counter after processing text
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'STRONG') {
        const strongTextRuns = Array.from(node.childNodes).map((child) => {
          return new TextRun({
            text: child.textContent.replace(/\s+/g, ' ').trim(), // Normalize whitespace
            bold: true,
            italics: settings.italic,
            underline: settings.underline ? {} : null,
            color: settings.color,
            font: settings.fontFamily,
            size: settings.fontSize * 2
          });
        });
        paragraphs.push(new Paragraph({ children: strongTextRuns }));
        consecutiveBrCount = 0; // Reset counter after processing strong text
      } else if (node.tagName === 'BR') {
        consecutiveBrCount++;
        if (consecutiveBrCount === 2) {
          // Insert an empty paragraph after two consecutive <br> tags
          paragraphs.push(new Paragraph({ children: [] }));
          consecutiveBrCount = 0; // Reset counter after inserting empty paragraph
        }
      } else if (node.tagName === 'DIV') {
        // Treat <div> as a new paragraph
        const divParagraph = new Paragraph({ children: [] });
        Array.from(node.childNodes).forEach((child) => {
          processNode(child); // Process child nodes
        });
        paragraphs.push(divParagraph); // Add the completed <div> paragraph
        consecutiveBrCount = 0; // Reset counter after processing div
      } else {
        Array.from(node.childNodes).forEach(processNode);
      }
    }
  };

  Array.from(doc.body.childNodes).forEach(processNode);
  return paragraphs;
};

/**
 * Generates paragraphs from a content block with specified settings.
 *
 * @param {Object} block - The content block to generate paragraphs from.
 * @returns {Paragraph[]} An array of docx Paragraph objects.
 */
const generateParagraphs = (block) =>
  parseHtmlToParagraphs(block.content, block.settings);

/**
 * Generates a docx Document from an array of content blocks.
 *
 * @param {Array<Object>} blocks - An array of content blocks to include in the document.
 * @returns {Promise<Document>} A Promise that resolves to a docx Document.
 */
const generateDocx = async (blocks) => {
  const childrenPromises = blocks.map(async (block) => {
    const sourceBlock = blocks.find(
      (b) => b.type === 'table' && b?.title === block?.sources
    );

    if (block.type === 'text') {
      return generateParagraphs(block); // Return paragraphs for text blocks
    } else if (block.type === 'table' && block?.visible) {
      return new Table({
        rows: block.content.map(
          (row) =>
            new TableRow({
              children: row.map(
                (cell) =>
                  new TableCell({
                    children: generateParagraphs({
                      ...block,
                      content: cell
                    })
                  })
              )
            })
        )
      });
    } else if (block.type === 'stat') {
      return generateParagraphs({
        ...block,
        content: generateStatText(block, sourceBlock)
      });
    } else if (block.type === 'test') {
      return generateParagraphs({
        ...block,
        content: generateTestText(
          block,
          getTestResults(
            getColumnData(block, sourceBlock, block?.col),
            getColumnData(block, sourceBlock, block?.col2),
            block,
            sourceBlock
          ),
          sourceBlock
        )
      });
    } else if (block.type === 'interval') {
      const data1 = getColumnData(block, sourceBlock, block?.col);
      const data2 = getColumnData(block, sourceBlock, block?.col2);
      const interval = getInterval(
        block?.intervalType,
        data1,
        data2,
        block?.confidenceLevel
      );
      const intervalText = getIntervalText(
        block?.confidenceLevel,
        block?.intervalType,
        block?.col,
        block?.col2,
        interval
      );
      return generateParagraphs({
        ...block,
        content: intervalText
      });
    } else if (block.type === 'chart') {
      const tempDiv = document.createElement('div');
      document.body.appendChild(tempDiv);
      const sourceData = sourceBlock?.content;

      if (!sourceData) {
        console.warn('No source data available for chart block');
        document.body.removeChild(tempDiv);
        return []; // Return an empty array if no source data
      }

      const rotatedData = rotateData(sourceData, block?.cols, sourceBlock);
      const x = getXCol(sourceData, block?.hasHeaders, block?.xCol);
      const chartData = generateChartData(
        sourceBlock,
        block?.chartType,
        rotatedData,
        x
      );
      const chartLayout = generateChartLayout(
        block?.title,
        block?.chartType,
        chartData
      );

      try {
        // @ts-ignore
        await Plotly.newPlot(tempDiv, chartData, chartLayout);
        const imageData = await Plotly.toImage(tempDiv, {
          format: 'png',
          width: 600,
          height: 400
        });
        const base64Data = imageData.split(',')[1];
        const imageRun = new ImageRun({
          data: base64Data,
          transformation: {
            width: 600,
            height: 400
          }
        });
        document.body.removeChild(tempDiv);
        return [new Paragraph({ children: [imageRun] })]; // Return an array with the image paragraph
      } catch (error) {
        console.error('Error generating chart:', error);
        document.body.removeChild(tempDiv);
        return []; // Return an empty array on error
      }
    }

    return []; // Return an empty array for unhandled block types
  });

  // Wait for all promises to resolve and flatten the result
  const children = await Promise.all(childrenPromises);
  return new Document({
    sections: [
      {
        properties: {
          page: { size: { width: 12240, height: 15840 } }
        },
        children: children.flat() // Flatten the array of children
      }
    ]
  });
};

/**
 * Saves a docx Document to a file.
 *
 * @param {Document} doc - The docx Document to save.
 * @param {string} fileName - The name of the file to save.
 */
export const saveDocx = async (doc, fileName) => {
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${fileName}.docx`);
};

export default generateDocx;
