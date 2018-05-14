import { dialog } from 'electron';
import { ACTION_TYPE, Action, Answer, Inquirer, Question, MessageBoxOptions } from '../types';

export const showMessageAction: ShowMessageAction = {
  type: ACTION_TYPE.SHOW_MESSAGE,

  /**
   * Although using this action configuraton we could implement a "confirm" and more, this class
   * only present an alert and don't have any other logic. For confirmation and 
   * selections use other Questions, like `confirm`. 
   */
  execute: (host: Inquirer, config: ShowMessageQuestion) => {
    return new Promise(resolve => {
      const defaultShowMessageOptions: MessageBoxOptions = {
        title: config.title || 'Message',
        buttons: [config.button || 'OK'],
        message: config.message || 'Generic message'
      }
      const finalMessageBoxOptions = Object.assign({}, defaultShowMessageOptions, config.dialog || {})
      if (finalMessageBoxOptions.title) {
        host.getBrowserWindow().setTitle(finalMessageBoxOptions.title)
      }
      dialog.showMessageBox(host.getBrowserWindow(), finalMessageBoxOptions, (buttonPressed: number, checkboxChecked: boolean) => {
        resolve({ id: config.id, value: { buttonPressed, checkboxChecked } })
      })
    })
  }
}

/**
 *  * dialog.message is the text of in the dialog to show to the user
 *  * use `dialog.type` to customize the dialog icon 
 */
export interface ShowMessageQuestion extends Question {
  /** title of the dialog */
  title?: string
  /** confirm and cancel buttons labels. Order is important: first is the 'confirm' button , second is the 'cancel' button */
  button?: string
  /** Message to show to the user */
  message: string
  /** properties to pass directly when creating electron dialog */
  dialog?: MessageBoxOptions
}

export interface ShowMessageAnswer extends Answer {
  value: { buttonPressed: number, checkboxChecked: boolean }
}
/** well this is not an inquirer just an alert, but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface ShowMessageAction extends Action<ShowMessageQuestion, ShowMessageAnswer> {
  execute: (host: Inquirer, config: ShowMessageQuestion) => Promise<ShowMessageAnswer>
}

