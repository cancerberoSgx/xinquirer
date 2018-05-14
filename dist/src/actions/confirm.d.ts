import { Action, Answer, Inquirer, Question, MessageBoxOptions } from '../types';
export declare const confirmAction: ConfirmAction;
/**
 *  * dialog.message is the text of in the dialog to show to the user
 *  * use `dialog.type` to customize the dialog icon
 */
export interface ConfirmQuestion extends Question, MessageBoxOptions {
    okButton?: string;
    cancelButton?: string;
}
export interface ConfirmAnswer extends Answer {
    /** if true then it means user confirmed this action */
    value: boolean;
}
/** well this is not an inquirer just an alert, but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface ConfirmAction extends Action<ConfirmQuestion, ConfirmAnswer> {
    execute: (host: Inquirer, config: ConfirmQuestion) => Promise<ConfirmAnswer>;
}
