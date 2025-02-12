import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A select element with options based on the columns property.
 */
@customElement('column-select')
export class StatSelect extends LitElement {
  @property({ type: String }) value: string = '';
  @property({ type: Array }) columns: Array<string> = [];

  /**
   * Returns the CSS styles for the select element.
   *
   * @return {CSSResult} The CSS styles for the select element.
   */
  static get styles() {
    return css`
      select {
        background-color: white;
        border: 1px solid black;
        color: black;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        border-radius: 5px;
        font-size: 15px;
      }
    `;
  }

  /**
   * Called when the element is first updated, initializes default value
   */
  firstUpdated() {
    this._initializeDefaultValue();
  }

  /**
   * Called when the element is updated, initializes default value if it doesn't already
   * have a value and there are columns
   *
   * @param {Map<string | number | symbol, unknown>} changedProperties The properties that have changed
   */
  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('columns') && this.value === '') {
      this._initializeDefaultValue();
    }
  }

  /**
   * Initializes the default value if it doesn't already have a value and there are columns
   */
  _initializeDefaultValue() {
    if (this.columns.length > 0 && this.value === '') {
      this.value = this.columns[0];
    }
  }

  /**
   * Renders a select element with options based on the columns property.
   *
   * @return {TemplateResult} The rendered HTML template.
   */
  render() {
    return html`<select @change=${(e: any) => (this.value = e.target.value)}>
      ${this.columns.map(
        (column) => html` <option value="${column}">${column}</option> `
      )}
    </select>`;
  }
}
