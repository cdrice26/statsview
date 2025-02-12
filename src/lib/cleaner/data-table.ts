import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * An element that displays data in a table. Requires column headers and data.
 */
@customElement('data-table')
export class DataTable extends LitElement {
  @property({ type: Array }) columns: Array<string> = [];
  @property({ type: Array }) data: Array<Array<any>> = [];

  /**
   * Styles for the table
   **/
  static styles = css`
    table,
    tr,
    td,
    th {
      border-collapse: collapse;
      border: 1px solid black;
    }

    td,
    th {
      padding: 3px;
    }

    table {
      float: left;
      margin-right: 20px;
      margin-left: 20px;
    }
  `;

  /**
   * Renders a table element with specified column headers and data.
   *
   * @return {TemplateResult} The rendered HTML template of the table.
   */
  render() {
    return html`
      <table>
        <thead>
          <tr>
            ${this.columns.map((col) => html` <th>${col}</th> `)}
          </tr>
        </thead>
        <tbody>
          ${this.data.map(
            (row) => html`
              <tr>
                ${row.map((cell) => html` <td>${cell}</td> `)}
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}
