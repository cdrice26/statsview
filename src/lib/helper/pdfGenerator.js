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

// @ts-ignore
import Plotly from 'plotly.js-dist';

const parseHtmlToText = (html, settings) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  let text = '';
  let bold = false;

  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const nodeText = node.textContent.replace(/\s+/g, ' ').trim();
      text += bold ? `**${nodeText}**` : nodeText;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'BR') {
        text += '\n';
      } else if (node.tagName === 'DIV') {
        text += '\n';
        Array.from(node.childNodes).forEach(processNode);
      } else if (node.tagName === 'STRONG') {
        bold = true;
        Array.from(node.childNodes).forEach(processNode);
        bold = false;
      } else {
        Array.from(node.childNodes).forEach(processNode);
      }
    }
  };

  Array.from(doc.body.childNodes).forEach(processNode);
  return text;
};

const generateText = (block) => parseHtmlToText(block.content, block.settings);

const addTextToPdf = (doc, text, settings, margins, cursorY) => {
  doc.setFont(settings.fontFamily);
  doc.setFontSize(settings.fontSize);
  doc.setTextColor(settings.color);

  const paragraphs = text.split('\n');
  paragraphs.forEach((paragraph) => {
    let segments = paragraph.split('**');
    segments.forEach((segment, index) => {
      let fontStyle = settings.italic ? 'italic' : 'normal';
      if (index % 2 !== 0) {
        fontStyle = settings.italic ? 'bolditalic' : 'bold';
      } else {
        fontStyle = settings.bold ? 'bold' : fontStyle;
      }

      doc.setFont(settings.fontFamily, fontStyle);
      const lines = doc.splitTextToSize(
        segment,
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
    });
  });

  return cursorY;
};

const preGenerateCharts = async (blocks) => {
  const charts = {};
  for (const block of blocks) {
    if (block.type === 'chart') {
      const tempDiv = document.createElement('div');
      document.body.appendChild(tempDiv);
      const sourceBlock = blocks.find(
        (b) => b.type === 'table' && b?.title === block?.sources
      );
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
        charts[block.id] = imageData;
        document.body.removeChild(tempDiv);
        console.log(`Generated chart image for block id: ${block.id}`);
      } catch (error) {
        console.error('Error generating chart:', error);
        document.body.removeChild(tempDiv);
      }
    }
  }
  return charts;
};

const addChartToPdf = (doc, imageData, margins, cursorY) => {
  console.log('Adding chart to PDF');

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  const maxWidth = pageWidth - margins.left - margins.right;
  const maxHeight = pageHeight - margins.top - margins.bottom;

  // Get the natural dimensions of the image using jsPDF's internal method
  const imgProps = doc.getImageProperties(imageData);
  const aspectRatio = imgProps.width / imgProps.height;

  let imgWidth = maxWidth;
  let imgHeight = maxWidth / aspectRatio;

  // Scale the image down to fit within the available height if necessary
  if (imgHeight > maxHeight) {
    imgHeight = maxHeight;
    imgWidth = maxHeight * aspectRatio;
  }

  // Ensure the image fits on the current page
  if (cursorY + imgHeight > pageHeight - margins.bottom) {
    doc.addPage();
    cursorY = margins.top; // reset cursorY to top of new page
    console.log('Added new page for chart');
  }

  doc.addImage(imageData, 'PNG', margins.left, cursorY, imgWidth, imgHeight);
  cursorY += imgHeight + 20; // update cursorY after adding the chart
  console.log(`New cursorY after chart: ${cursorY}`);

  return cursorY;
};

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
  const charts = await preGenerateCharts(blocks);

  for (const block of blocks) {
    const sourceBlock = blocks.find(
      (b) => b.type === 'table' && b?.title === block?.sources
    );

    if (block.type === 'text') {
      cursorY = addTextToPdf(
        doc,
        generateText(block),
        block.settings,
        margins,
        cursorY
      );
    } else if (block.type === 'table' && block?.visible) {
      // @ts-ignore
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
        tableWidth: 'wrap', // Wrap content
        tableLineColor: [0, 0, 0],
        tableLineWidth: 1
      });
      // @ts-ignore
      cursorY = doc.autoTable.previous.finalY + 10;
      if (cursorY > doc.internal.pageSize.height - margins.bottom) {
        doc.addPage();
        cursorY = margins.top;
      }
    } else if (block.type === 'stat') {
      cursorY = addTextToPdf(
        doc,
        generateText({
          ...block,
          content: generateStatText(block, sourceBlock)
        }),
        block.settings,
        margins,
        cursorY
      );
    } else if (block.type === 'test') {
      cursorY = addTextToPdf(
        doc,
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
        block.settings,
        margins,
        cursorY
      );
    } else if (block.type === 'chart') {
      const imageData = charts[block.id];
      cursorY = addChartToPdf(doc, imageData, margins, cursorY);
    }
  }

  return doc;
};

export const savePDF = async (doc, fileName) => {
  doc.save(`${fileName}.pdf`);
};

export default generatePDF;
