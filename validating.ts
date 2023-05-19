import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

/** An editor [[`plugin`]] to configure validators and display their issue centrally */
export default class ValidatingPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;

  /** SCL change indicator */
  @property({ type: Number })
  editCount = 0;

  render() {
    return html``;
  }

  static styles = css``;
}
