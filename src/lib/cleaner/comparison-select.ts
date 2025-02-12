import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A select element with options for comparison operators.
 **/
@customElement('comparison-select')
export class StatSelect extends LitElement {
  @property({ type: String }) value = '=';

  /**
   * Returns the CSS styles for the select element.
   *
   * @return {CSSResult} The CSS styles for the select element.
   */
  static get styles() {
    return css`
      select {
        background-color: darkgrey;
        border: none;
        color: white;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        border-radius: 5px;
        font-size: 15px;
      }
    `;
  }

  /**
   * Renders a select element with options for comparison operators.
   *
   * @return {TemplateResult} The rendered HTML template.
   */
  render() {
    return html`<select @change=${(e: any) => (this.value = e.target.value)}>
      <option value="&lt;">&lt;</option>
      <option value="&lt;=">&lt;=</option>
      <option value="=">=</option>
      <option value="!=">!=</option>
      <option value="&gt;=">&gt;=</option>
      <option value="&gt;">&gt;</option>
    </select>`;
  }
}
