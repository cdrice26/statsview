import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import generateStatText from './statTextGenerator';
import { generateTestText, getColumnData, getTestResults } from './testHelpers';
import {
  generateChartData,
  generateChartLayout,
  getXCol,
  rotateData
} from './chartHelpers';
import Plotly from 'plotly.js-dist';

const parseHtmlToText = (html, settings) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  let text = '';
  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent.replace(/\s+/g, ' ').trim() + '\n';
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'BR') {
        text += '\n';
      } else if (node.tagName === 'DIV') {
        Array.from(node.childNodes).forEach(processNode);
        text += '\n';
      } else {
        Array.from(node.childNodes).forEach(processNode);
      }
    }
  };
  Array.from(doc.body.childNodes).forEach(processNode);
  return text;
};

const generateText = (block) => parseHtmlToText(block.content, block.settings);

const generatePDF = async (blocks) => {
  const doc = new jsPDF();
  const addTextToPdf = (text, settings) => {
    doc.setFont(settings.fontFamily);
    doc.setFontSize(settings.fontSize);
    doc.setTextColor(settings.color);
    let fontStyle = 'normal';
    if (settings.bold && settings.italic) fontStyle = 'bolditalic';
    else if (settings.bold) fontStyle = 'bold';
    else if (settings.italic) fontStyle = 'italic';
    doc.setFont(fontStyle);
    if (settings.underline) {
      // Underline by drawing a line below the text
      const textWidth =
        (doc.getStringUnitWidth(text) * settings.fontSize) /
        doc.internal.scaleFactor;
      doc.text(text, 10, 10);
      doc.line(10, 12, 10 + textWidth, 12);
    } else {
      doc.text(text, 10, 10);
    }
  };

  for (const block of blocks) {
    const sourceBlock = blocks.find(
      (b) => b.type === 'table' && b?.title === block?.sources
    );
    if (block.type === 'text') {
      addTextToPdf(generateText(block), block.settings);
    } else if (block.type === 'table' && block?.visible) {
      doc.autoTable({
        head: [block.content[0]],
        body: block.content.slice(1)
      });
      doc.addPage();
    } else if (block.type === 'stat') {
      addTextToPdf(
        generateText({
          ...block,
          content: generateStatText(block, sourceBlock)
        }),
        block.settings
      );
    } else if (block.type === 'test') {
      addTextToPdf(
        generateText({
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
        }),
        block.settings
      );
    } else if (block.type === 'chart') {
      const tempDiv = document.createElement('div');
      document.body.appendChild(tempDiv);
      const sourceData = sourceBlock?.content;
      if (!sourceData) {
        console.warn('No source data available for chart block');
        document.body.removeChild(tempDiv);
        continue;
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
        await Plotly.newPlot(tempDiv, chartData, chartLayout);
        const imageData = await Plotly.toImage(tempDiv, {
          format: 'png',
          width: 600,
          height: 400
        });
        doc.addImage(imageData, 'PNG', 15, 40, 180, 160);
        document.body.removeChild(tempDiv);
      } catch (error) {
        console.error('Error generating chart:', error);
        document.body.removeChild(tempDiv);
      }
    }
  }

  return doc;
};

export const savePDF = async (doc, fileName) => {
  doc.save(`${fileName}.pdf`);
};

export default generatePDF;
