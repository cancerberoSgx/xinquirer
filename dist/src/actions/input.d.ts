import { Action, Answer, Inquirer, Question } from '../types';
export declare const inputAction: InputAction;
export declare function _inputHandler(value: string): void;
export declare function _getCurrentConfig(): InputQuestion;
export interface InputQuestion extends Question {
    /** Message to show to the user */
    message: string;
    /** window title */
    title?: string;
    /** submit button label */
    button?: string;
    /** input placeholder (html placeholder) */
    placeholder?: string;
    /** if a text area (multiple line text) */
    textarea?: boolean;
    /** text, password, email, phone, color,  - any valid html5 input type - default is text. doesn't work with textarea */
    inputType?: string;
}
export interface InputAnswer extends Answer {
    value: string;
}
/** well this is not an inquirer just an alert, but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface InputAction extends Action<InputQuestion, InputAnswer> {
    execute: (inquirer: Inquirer, config: InputQuestion) => Promise<InputAnswer>;
}
