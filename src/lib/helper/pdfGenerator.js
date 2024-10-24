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
  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter',
    orientation: 'portrait'
  });

  const margins = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 40
  };

  let cursorY = margins.top;

  const addTextToPdf = (text, settings) => {
    doc.setFont(settings.fontFamily);
    doc.setFontSize(settings.fontSize);
    doc.setTextColor(settings.color);

    let fontStyle = 'normal';
    if (settings.bold && settings.italic) fontStyle = 'bolditalic';
    else if (settings.bold) fontStyle = 'bold';
    else if (settings.italic) fontStyle = 'italic';
    doc.setFont(fontStyle);

    const lines = doc.splitTextToSize(
      text,
      doc.internal.pageSize.width - margins.left - margins.right
    );
    if (
      cursorY + lines.length * settings.fontSize * 1.15 >
      doc.internal.pageSize.height - margins.bottom
    ) {
      doc.addPage();
      cursorY = margins.top;
    }

    doc.text(lines, margins.left, cursorY);
    cursorY += lines.length * settings.fontSize * 1.15;
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
        body: block.content.slice(1),
        startY: cursorY,
        margin: margins,
        styles: {
          font: block.settings.fontFamily,
          fontSize: block.settings.fontSize,
          textColor: block.settings.color,
          lineColor: 0, // Black borders
          cellPadding: 5,
          fillColor: [255, 255, 255] // No background color
        },
        headStyles: {
          fontStyle: 'bold',
          fillColor: [255, 255, 255], // No background color
          textColor: 0,
          lineWidth: 1,
          lineColor: 0
        },
        bodyStyles: {
          lineWidth: 1,
          lineColor: 0 // Black borders between cells
        },
        theme: 'plain',
        tableWidth: 'auto', // Columns fit content
        tableLineColor: [0, 0, 0],
        tableLineWidth: 1
      });
      cursorY = doc.autoTable.previous.finalY + 10;
      if (cursorY > doc.internal.pageSize.height - margins.bottom) {
        doc.addPage();
        cursorY = margins.top;
      }
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
          width: 900,
          height: 600
        });
        const imgProps = {
          x: margins.left,
          y: cursorY,
          width: 512, // Maintain aspect ratio
          height: 384
        };

        if (
          cursorY + imgProps.height >
          doc.internal.pageSize.height - margins.bottom
        ) {
          doc.addPage();
          cursorY = margins.top;
        }

        doc.addImage(
          imageData,
          'PNG',
          imgProps.x,
          imgProps.y,
          imgProps.width,
          imgProps.height
        );
        cursorY += imgProps.height + 20;
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
