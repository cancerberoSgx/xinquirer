import { dialog } from 'electron';
import { ACTION_TYPE, Action, Answer, Inquirer, Question, MessageBoxOptions, questionToElectronDialogOption } from '../types';

// TODO: confirm could be configurable: instead of two buttons show the checkbox and only one

export const confirmAction: ConfirmAction = {
  type: ACTION_TYPE.CONFIRM,
  execute: (host: Inquirer, config: ConfirmQuestion) => {
    return new Promise(resolve => {
      // const defaultConfirmOptions: MessageBoxOptions = {
      //   title: config.title || 'Confirm',
      //   buttons: [config.okButton||'OK', config.cancelButton||'Cancel'],
      //   message: config.message || 'Do you really want to confirm this generic stuff?'
      // }
      config.buttons = config.buttons || [config.okButton||'OK', config.cancelButton||'Cancel']
      // const finalMessageBoxOptions = Object.assign({}, defaultConfirmOptions, config.dialog||{})
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
  // /** title of the dialog */
  // title?: string
  okButton? : string
  cancelButton?: string
  // /** Message to show to the user */
  // message: string
  // /** properties to pass directly when creating electron dialog */
  // dialog: MessageBoxOptions
}

export interface ConfirmAnswer extends Answer {
  /** if true then it means user confirmed this action */
  value: boolean
}
/** well this is not an inquirer just an alert, but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface ConfirmAction extends Action<ConfirmQuestion, ConfirmAnswer> {
  execute: (host: Inquirer, config: ConfirmQuestion) => Promise<ConfirmAnswer>
}

