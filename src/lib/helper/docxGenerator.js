import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell
} from 'docx';
import { saveAs } from 'file-saver';
import generateStatText from './statTextGenerator';
import { generateTestText, getColumnData, getTestResults } from './testHelpers';

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

const generateParagraphs = (block) =>
  parseHtmlToParagraphs(block.content, block.settings);

const generateDocx = (blocks) =>
  new Document({
    sections: [
      {
        properties: {},
        children: blocks.reduce((acc, block) => {
          const sourceBlock = blocks.find(
            (b) => b.type === 'table' && b?.title === block?.sources
          );
          if (block.type === 'text') {
            const paragraphs = generateParagraphs(block);
            return acc.concat(paragraphs); // Concatenate paragraphs to the accumulator
          } else if (block.type === 'table' && block?.visible) {
            return acc.concat(
              new Table({
                rows: block.content.map(
                  (row) =>
                    new TableRow({
                      children: row.map(
                        (cell) =>
                          new TableCell({
                            children: [
                              ...generateParagraphs({
                                ...block,
                                content: cell
                              })
                            ]
                          })
                      )
                    })
                )
              })
            );
          } else if (block.type === 'stat') {
            return acc.concat(
              generateParagraphs({
                ...block,
                content: generateStatText(block, sourceBlock)
              })
            );
          } else if (block.type === 'test') {
            return acc.concat(
              generateParagraphs({
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
              })
            );
          } else if (block.type === 'chart') {
          }
          return acc; // Return the accumulator unchanged for other block types
        }, [])
      }
    ]
  });

export const saveDocx = async (doc, fileName) => {
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${fileName}.docx`);
};

export default generateDocx;
