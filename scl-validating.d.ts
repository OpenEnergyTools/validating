import { LitElement, TemplateResult } from 'lit';
import '@material/mwc-button';
import '@material/mwc-list';
import { IssueDetail } from './foundation/utils.js';
/** An editor [[`plugin`]] to configure validators and display their issue centrally */
export default class SclValidatingPlugin extends LitElement {
    /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
    doc: XMLDocument;
    /** The name of the document being edited */
    docName: string;
    /** SCL change indicator */
    editCount: number;
    issues: Map<string, IssueDetail[]>;
    private validate;
    private onIssue;
    performUpdate(): Promise<void>;
    constructor();
    private renderIssueEntry;
    private renderValidatorsIssues;
    private renderIssues;
    render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
