import { Action, Answer, Inquirer, Question, QuestionValidate, OpenDialogOptions, MessageBoxOptions } from '../types';
export declare const selectFilesAction: SelectFilesAction;
export interface SelectFilesQuestion extends Question, OpenDialogOptions {
    /**
     * Validate the answer, if not valid return a string with a hint explaining the user why.
     * If valid return false. You can return a promise resolved with the same semantic for main the validation async
     */
    validate?: SelectFilesQuestionValidate;
}
export interface SelectFilesQuestionValidate extends QuestionValidate {
    predicate: (answer: SelectFilesAnswer) => false | string | Promise<false | string>;
    dialogOptions?: MessageBoxOptions;
}
export interface SelectFilesAnswer extends Answer {
    value?: {
        /**
        * if user cancel pressing ESC files will be undefined
        */
        files?: string[];
        bookmarks?: string[];
    };
}
export interface SelectFilesAction extends Action<SelectFilesQuestion, SelectFilesAnswer> {
    execute: (host: Inquirer, config: SelectFilesQuestion) => Promise<SelectFilesAnswer>;
}
