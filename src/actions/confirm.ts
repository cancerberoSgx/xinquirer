import { dialog } from 'electron';
import { ACTION_TYPE, Action, Answer, Inquirer, Question, MessageBoxOptions, questionToElectronDialogOption } from '../types';

// TODO: confirm could be configurable: instead of two buttons show the checkbox and only one

export const confirmAction: ConfirmAction = {
  type: ACTION_TYPE.CONFIRM,
  execute: (host: Inquirer, config: ConfirmQuestion) => {
    return new Promise(resolve => {
      config.buttons = config.buttons || [config.okButton||'OK', config.cancelButton||'Cancel']
      if(config.title){
        host.getBrowserWindow().setTitle(config.title)
      }
      dialog.showMessageBox(host.getBrowserWindow(), questionToElectronDialogOption(config), (buttonPressed: number, checkboxChecked: boolean) => {
        resolve({ id: config.id, value: buttonPressed===0 })
      })
    })
  }
}

/**
 *  * dialog.message is the text of in the dialog to show to the user
 *  * use `dialog.type` to customize the dialog icon 
 */
export interface ConfirmQuestion extends Question, MessageBoxOptions {
  okButton? : string
  cancelButton?: string
}

export interface ConfirmAnswer extends Answer {
  /** if true then it means user confirmed this action */
  value: boolean
}
/** well this is not an inquirer just an alert, but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface ConfirmAction extends Action<ConfirmQuestion, ConfirmAnswer> {
  execute: (host: Inquirer, config: ConfirmQuestion) => Promise<ConfirmAnswer>
}

