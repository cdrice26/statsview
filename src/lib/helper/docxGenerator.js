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

const generateTextRun = (block) =>
  new Paragraph({
    alignment: block.settings.textAlign,
    children: [
      new TextRun({
        text: block.content,
        bold: block.settings.bold,
        italics: block.settings.italic,
        underline: block.settings.underline ? {} : null,
        color: block.settings.color,
        font: block.settings.fontFamily,
        size: block.settings.fontSize * 2
      })
    ]
  });

const generateDocx = (blocks) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: blocks.map((block) =>
          block.type === 'text'
            ? generateTextRun(block)
            : block.type === 'table' && block?.visible
            ? new Table({
                rows: block.content.map(
                  (row) =>
                    new TableRow({
                      children: row.map(
                        (cell) =>
                          new TableCell({
                            children: [
                              generateTextRun({ ...block, content: cell })
                            ]
                          })
                      )
                    })
                )
              })
            : block.type === 'stat'
            ? generateTextRun({
                ...block,
                content: generateStatText(
                  block,
                  blocks.find(
                    (b) => b.type === 'table' && b?.title === block?.sources
                  )
                )
              })
            : block.type === 'test'
            ? generateTextRun({
                ...block,
                content: generateTestText(
                  block,
                  getTestResults(
                    getColumnData(
                      block,
                      blocks.find(
                        (b) => b.type === 'table' && b?.title === block?.sources
                      ),
                      block?.col
                    ),
                    getColumnData(
                      block,
                      blocks.find(
                        (b) => b.type === 'table' && b?.title === block?.sources
                      ),
                      block?.col2
                    ),
                    block,
                    blocks.find(
                      (b) => b.type === 'table' && b?.title === block?.sources
                    )
                  ),
                  blocks.find(
                    (b) => b.type === 'table' && b?.title === block?.sources
                  )
                )
              })
            : {}
        )
      }
    ]
  });

  return doc;
};

export const saveDocx = async (doc, fileName) => {
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${fileName}.docx`);
};

export default generateDocx;
