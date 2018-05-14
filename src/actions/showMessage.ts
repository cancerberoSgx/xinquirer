import { dialog } from 'electron';
import { ACTION_TYPE, Action, Answer, Inquirer, Question, MessageBoxOptions } from '../types';

export const showMessageAction: ShowMessageAction = {

  type: ACTION_TYPE.SHOW_MESSAGE,

  /**
   * Although with showMessageBox we could implement a confirm and more, this class
   * only present an alert and not has any other logic. For confirmation and 
   * selections use other Questions
   * 
   * @param config From: electron's showOpenDialog method documentation: 
   * 
   * 'Shows a message box, it will block the process until the message box is closed.
   * It returns the index of the clicked button. The browserWindow argument allows
   * the dialog to attach itself to a parent window, making it modal. If a callback
   * is passed, the dialog will not block the process. The API call will be
   * asynchronous and the result will be passed via callback(response)'
   */
  execute: (host: Inquirer, config: ShowMessageQuestion) => {
    return new Promise(resolve => {
      const defaultShowMessageOptions: MessageBoxOptions = {
        title: 'Message',
        buttons: ['OK'],
        message: 'Generic message'
      }
      // config.dialog = config.dialog || defaultShowMessageOptions
      // const finalConfig = Object.assign({}, { dialog: defaultShowMessageOptions }, config)
      const finalMessageBoxOptions = Object.assign({}, defaultShowMessageOptions, config.dialog||{})
      if(finalMessageBoxOptions.title){
        host.getBrowserWindow().setTitle(finalMessageBoxOptions.title)
      }
      // console.log(finalConfig.dialog)
      const id = dialog.showMessageBox(host.getBrowserWindow(), finalMessageBoxOptions, (buttonPressed: number, checkboxChecked: boolean) => {
        resolve({ id: config.id, value: {buttonPressed, checkboxChecked} })
      })
    })
  }
}

/**
 *  * dialog.message is the text of in the dialog to show to the user
 *  * use `dialog.type` to customize the dialog icon 
 */
export interface ShowMessageQuestion extends Question {
  /** properties to pass directly when creating electron dialog */
  dialog: MessageBoxOptions
}

export interface ShowMessageAnswer extends Answer {
  value: {buttonPressed: number, checkboxChecked: boolean}
}
/** well this is not an inquirer just an alert, but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface ShowMessageAction extends Action<ShowMessageQuestion, ShowMessageAnswer> {
  execute: (host: Inquirer, config: ShowMessageQuestion) => Promise<ShowMessageAnswer>
}

