import { ACTION_TYPE, Inquirer, Action, Question, Answer } from "../types";
import { dialog, OpenDialogOptions, MessageBoxOptions } from "electron";

export const showMessageAction: ShowMessageAction = {
  
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
      title: 'Message', 
      buttons: ['OK'],
     message: 'Generic message'
    }
    config.dialog = config.dialog || defaultShowMessageOptions
    const finalConfig = Object.assign({}, {dialog: defaultShowMessageOptions}, config)
    finalConfig.dialog = Object.assign({}, defaultShowMessageOptions, config.dialog)
   // finalConfig.dialog.type = config.dialogType || finalConfig.dialog.type || MessageDialogType.info

    // let callbackCalled = false
    const id = dialog.showMessageBox(finalConfig.dialog, (buttonPressed:number, checkboxChecked:boolean)=>{
      // callbackCalled = true
      // console.log('callback called')
      resolve({id:config.id, value: id })
    })
    // if(!callbackCalled){
    //   console.log('callback cNOT alled')
    //   resolve({id:config.id, value: id })
    // }
  })

  }
}

// export enum MessageDialogType {
//   info='info',
//   error = 'error',
//   question='question',
//   warning='warning'
// }
/**
 *  * label is the title of the dialog
 *  * dialog.message is the text of in the dialog to show to the user
 *  * use `dialogType` to customize the dialog icon 
 */
export interface ShowMessageQuestion extends Question{
  // message: string,
  /** properties to pass directly when creating electron dialog */
  dialog : MessageBoxOptions
  // buttonLabel?: string
  // dialogType?: MessageDialogType
}

export interface ShowMessageAnswer extends Answer {
  value: number
}
/** well this is not an inquirer just an alert, but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface ShowMessageAction extends Action<ShowMessageQuestion, ShowMessageAnswer> {
  execute: (host: Inquirer, config: ShowMessageQuestion) => Promise<ShowMessageAnswer>
}

