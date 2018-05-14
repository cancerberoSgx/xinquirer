import { dialog } from 'electron';
import { ACTION_TYPE, Action, Answer, Inquirer, MessageBoxOptions, Question, questionToElectronDialogOption } from '../types';

export const showMessageAction: ShowMessageAction = {
  type: ACTION_TYPE.SHOW_MESSAGE,
  
  execute: (host: Inquirer, config: ShowMessageQuestion) => {
    return new Promise(resolve => {
        config.title = config.title || 'Message',
        config.buttons = config.buttons|| [config.button || 'OK'],
        config.message = config.message || 'Generic message'
      if (config.title) {
        host.getBrowserWindow().setTitle(config.title)
      }
      dialog.showMessageBox(host.getBrowserWindow(), questionToElectronDialogOption(config), (buttonPressed: number, checkboxChecked: boolean) => {
        resolve({ id: config.id, value: { buttonPressed, checkboxChecked } })
      })
    })
  }
}

export interface ShowMessageQuestion extends Question, MessageBoxOptions {
  /** title of the dialog */
  title?: string
  /** button label */
  button?: string
  /** Message to show to the user */
  message: string
}

export interface ShowMessageAnswer extends Answer {
  value: { buttonPressed: number, checkboxChecked: boolean }
}
/** well this is not an inquirer just an alert, but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface ShowMessageAction extends Action<ShowMessageQuestion, ShowMessageAnswer> {
  execute: (host: Inquirer, config: ShowMessageQuestion) => Promise<ShowMessageAnswer>
}

