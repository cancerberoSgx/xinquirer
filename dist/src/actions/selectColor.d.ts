import { Action, Answer, Inquirer, Question } from '../types';
export declare const selectColorAction: SelectColorAction;
export declare function _colorSelectedHandler(color: string): void;
export declare function _getCurrentConfig(): SelectColorQuestion;
export interface SelectColorQuestion extends Question {
    /** Message to show to the user */
    message: string;
    title?: string;
}
export interface SelectColorAnswer extends Answer {
    value: string;
}
/** well this is not an inquirer just an alert, but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface SelectColorAction extends Action<SelectColorQuestion, SelectColorAnswer> {
    execute: (inquirer: Inquirer, config: SelectColorQuestion) => Promise<SelectColorAnswer>;
}
