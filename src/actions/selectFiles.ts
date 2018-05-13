import { ACTION_TYPE, Inquirer, Action, Question, Answer } from "../types";
import { dialog, OpenDialogOptions } from "electron";

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
      const selection: string[] = dialog.showOpenDialog(config.openDialogOptions || defaultOpenDialogOptions)
      resolve({id:config.id, value: selection })
      // ,
      //   (files: string[], bookmarks: string[]) => {
          // TODO investsigate. possible electron issue . this callback doesn't seem to work - leave resolve just in case - seems to be an issue (according to docs it should pass). TODO investigate
      // }
    })

  }
}

const defaultOpenDialogOptions: OpenDialogOptions = {
  properties: ['openFile', 'multiSelections'], 
  title: 'Choose the target file', 
  filters: []
}

export interface SelectFilesQuestion extends Question{
  openDialogOptions? : OpenDialogOptions
  /** calls  showSaveDialog instead of showOpenDialog - TODO not supported yet */
  openSaveDialog?: boolean
}

export interface SelectFilesAnswer extends Answer {
  value: string[]
}
export interface SelectFilesAction extends Action {
  execute: (host: Inquirer, config: SelectFilesQuestion) => Promise<SelectFilesAnswer>
}

