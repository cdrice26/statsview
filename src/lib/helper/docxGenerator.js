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

const generateDocx = (blocks) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: blocks.map((block) =>
          block.type === 'text'
            ? new Paragraph({
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
              })
            : block.type === 'table' && block?.visible
            ? new Table({
                rows: block.content.map(
                  (row) =>
                    new TableRow({
                      children: row.map(
                        (cell) =>
                          new TableCell({
                            children: [
                              new Paragraph({
                                alignment: block.settings.textAlign,
                                children: [
                                  new TextRun({
                                    text: cell,
                                    bold: block.settings.bold,
                                    italics: block.settings.italic,
                                    underline: block.settings.underline
                                      ? {}
                                      : null,
                                    color: block.settings.color,
                                    font: block.settings.fontFamily,
                                    size: block.settings.fontSize * 2
                                  })
                                ]
                              })
                            ]
                          })
                      )
                    })
                )
              })
            : null
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
