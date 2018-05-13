import { ACTION_TYPE, Inquirer, Action, Question, Answer } from "../types";
import { dialog, OpenDialogOptions, MessageBoxOptions } from "electron";

export const selectFilesAction: ShowMessageAction = {
  
  type: ACTION_TYPE.SELECT_FILES,

 /**
   * @param config From electron's showOpenDialogmethod documentation: 

  * Shows a message box, it will block the process until the message box is closed.
  * It returns the index of the clicked button. The browserWindow argument allows
  * the dialog to attach itself to a parent window, making it modal. If a callback
  * is passed, the dialog will not block the process. The API call will be
  * asynchronous and the result will be passed via callback(response).
    */
  execute: (host: Inquirer, config: ShowMessageQuestion) => {
    return new Promise(resolve => {
      const selection: string[] = dialog.showMessageBox(config.dialog || defaultOpenDialogOptions)
      resolve({id:config.id, value: selection })
    })

  }
}

const defaultOpenDialogOptions: MessageBoxOptions = {
  // properties: ['openFile', 'multiSelections'], 
  title: 'Choose the target file', 
  buttons: ['Ok']
}

export interface ShowMessageQuestion extends Question{
  dialog? : OpenDialogOptions
  buttonLabel?: 'string'
}

export interface ShowMessageAnswer extends Answer {
  value: string[]
}
/** well this is not an inquierer - but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface ShowMessageAction extends Action {
  execute: (host: Inquirer, config: ShowMessageQuestion) => Promise<ShowMessageAnswer>
}

