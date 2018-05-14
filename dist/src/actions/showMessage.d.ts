import { Action, Answer, Inquirer, MessageBoxOptions, Question } from '../types';
export declare const showMessageAction: ShowMessageAction;
export interface ShowMessageQuestion extends Question, MessageBoxOptions {
    /** title of the dialog */
    title?: string;
    /** button label */
    button?: string;
    /** Message to show to the user */
    message: string;
}
export interface ShowMessageAnswer extends Answer {
    value: {
        buttonPressed: number;
        checkboxChecked: boolean;
    };
}
/** well this is not an inquirer just an alert, but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface ShowMessageAction extends Action<ShowMessageQuestion, ShowMessageAnswer> {
    execute: (host: Inquirer, config: ShowMessageQuestion) => Promise<ShowMessageAnswer>;
}
