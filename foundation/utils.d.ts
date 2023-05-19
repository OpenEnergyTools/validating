export interface IssueDetail {
    validatorId: string;
    title: string;
    message?: string;
}
export type IssueEvent = CustomEvent<IssueDetail>;
export declare function newIssueEvent(detail: IssueDetail, eventInitDict?: CustomEventInit<IssueDetail>): IssueEvent;
export interface ValidationError {
    file: string;
    line: number;
    column: number;
    level: 0 | 1 | 2 | 3;
    message: string;
    node: string;
    part: string;
    code: number;
    valid?: undefined;
    loaded?: undefined;
}
export interface LoadSchemaResult {
    file: string;
    valid?: undefined;
    loaded: boolean;
}
export interface ValidationResult {
    file: string;
    code: number;
    valid: boolean;
    loaded?: undefined;
}
export type Validator = (xml: string, xmlName: string) => Promise<ValidationResult>;
export type WorkerMessage = ValidationError | ValidationResult | LoadSchemaResult | string;
export declare function isValidationResult(msg: WorkerMessage): msg is ValidationResult;
export declare function isValidationError(msg: WorkerMessage): msg is ValidationError;
export declare function isLoadSchemaResult(msg: WorkerMessage): msg is LoadSchemaResult;
declare global {
    interface ElementEventMap {
        ['issue']: IssueEvent;
    }
}
