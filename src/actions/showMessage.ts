import { ACTION_TYPE, Inquirer, Action, Question, Answer } from "../types";
import { dialog, OpenDialogOptions, MessageBoxOptions } from "electron";

export const selectFilesAction: ShowMessageAction = {
  
  type: ACTION_TYPE.SHOW_MESSAGE,

 /**
   * @param config From electron's showOpenDialogmethod documentation
   * Although with showMessageBox we could implement a confirm and more, this class only present an alert and not has any other logic. For confirmation and selections between 2 or more items use showConfirm

  * Shows a message box, it will block the process until the message box is closed.
  * It returns the index of the clicked button. The browserWindow argument allows
  * the dialog to attach itself to a parent window, making it modal. If a callback
  * is passed, the dialog will not block the process. The API call will be
  * asynchronous and the result will be passed via callback(response).
    */
  execute: (host: Inquirer, config: ShowMessageQuestion) => {
    return new Promise(resolve => {

    const defaultShowMessageOptions: MessageBoxOptions = {
      title: 'Choose the target file', 
      buttons: ['OK'],
      message: config.message || 'Generic message'
    }
    const finalConfig = Object.assign({}, {dialog: defaultShowMessageOptions}, config)
    finalConfig.dialog = Object.assign({}, defaultShowMessageOptions, config.dialog)

    let callbackCalled = false
    const id = dialog.showMessageBox(finalConfig.dialog, (buttonPressed:number, checkboxChecked:boolean)=>{
      callbackCalled = true
      console.log('callback called')
    })
    if(!callbackCalled){
      console.log('callback cNOT alled')
      resolve({id:config.id, value: id })
    }
  })

  }
}


export interface ShowMessageQuestion extends Question{
  message: string,
  dialog? : MessageBoxOptions
  buttonLabel?: string
}

export interface ShowMessageAnswer extends Answer {
  value: number
}
/** well this is not an inquirer just an alert, but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface ShowMessageAction extends Action<ShowMessageQuestion, ShowMessageAnswer> {
  execute: (host: Inquirer, config: ShowMessageQuestion) => Promise<ShowMessageAnswer>
}

