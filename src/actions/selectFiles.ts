import { dialog, MessageBoxOptions } from 'electron';
import { ACTION_TYPE, Action, Answer, Inquirer, Question, QuestionValidate, OpenDialogOptions } from '../types';

export const selectFilesAction: SelectFilesAction = {

  type: ACTION_TYPE.SELECT_FILES,

  /**
    * @param config From electron's showOpenDialogmethod documentation: 
    * 
    * The browserWindow argument allows the dialog to attach itself to a parent
    * window, making it modal. The filters specifies an array of file types that can
    * be displayed or selected when you want to limit the user to a specific type. For
    * example: The extensions array should contain extensions without wildcards or
    * dots (e.g. 'png' is good but '.png' and '*.png' are bad). To show all files, use
    * the '*' wildcard (no other wildcard is supported). If a callback is passed, the
    * API call will be asynchronous and the result will be passed via
    * callback(filenames). Note: On Windows and Linux an open dialog can not be both a
    * file selector and a directory selector, so if you set properties to ['openFile',
    * 'openDirectory'] on these platforms, a directory selector will be shown.
    */
  execute: (host: Inquirer, config: SelectFilesQuestion) => {
    return new Promise(resolve => {

    const finalDialogOptions = Object.assign({}, {
      properties: ['openFile', 'multiSelections'],
      title: 'Choose the target file',
      filters: []
    }, config.dialog||{})

    host.getBrowserWindow().setTitle(finalDialogOptions.title)

    const selection: string[] = dialog.showOpenDialog(host.getBrowserWindow(),
      finalDialogOptions,
      (files: string[], bookmarks: string[]) => {
        resolve({ id: config.id, value: {files, bookmarks} })
      })
    })
  }
}


export interface SelectFilesQuestion extends Question {
  /** properties to pass directly when creating electron dialog */
  dialog?: OpenDialogOptions

  /**
   * Validate the answer, if not valid return a string with a hint explaining the user why. 
   * If valid return false. You can return a promise resolved with the same semantic for main the validation async
   */
  validate?: SelectFilesQuestionValidate
}
export interface SelectFilesQuestionValidate extends QuestionValidate {
  predicate:  (answer: SelectFilesAnswer) => false | string | Promise<false | string>
  dialogOptions?: MessageBoxOptions
}


export interface SelectFilesAnswer extends Answer {
  value?: {
    /**
    * if user cancel pressing ESC files will be undefined
    */
    files?: string[], 
    bookmarks?: string[]
  }
}
export interface SelectFilesAction extends Action<SelectFilesQuestion, SelectFilesAnswer> {
  execute: (host: Inquirer, config: SelectFilesQuestion) => Promise<SelectFilesAnswer>
}

