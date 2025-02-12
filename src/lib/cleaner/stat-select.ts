import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('stat-select')
export class StatSelect extends LitElement {
  @property({ type: String }) value = 'mean';

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

  render() {
    return html`<select @change=${(e: any) => (this.value = e.target.value)}>
      <option value="mean">Mean</option>
      <option value="median">Median</option>
      <option value="mode">Mode</option>
    </select>`;
  }
}
