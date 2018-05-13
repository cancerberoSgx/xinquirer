import { ACTION_TYPE, Inquirer, Action, Question, Answer } from "../types";
import { dialog, OpenDialogOptions } from "electron";

export const selectFilesAction: SelectFilesAction = {
  type: ACTION_TYPE.SELECT_FILES,
  execute: (host: Inquirer, config: SelectFilesQuestion) => {
    return new Promise(resolve => {
      dialog.showOpenDialog(config.openDialogOptions || defaultOpenDialogOptions),
        (files: string[], bookmarks: string[]) => {
          resolve({id:config.id, value: files })
      }
    })
  }
}

const defaultOpenDialogOptions: OpenDialogOptions = {
  properties: ['openFile', 'multiSelections'], 
  title: 'Choose the target file', 
  filters: []
  //TODO. perhaps we should add a flag for opening saveDialog instead of openDialog ? 
}
export interface SelectFilesQuestion extends Question{
  openDialogOptions? : OpenDialogOptions
}
export interface SelectFilesAnswer extends Answer {
  value: string[]
}
export interface SelectFilesAction extends Action {
  execute: (host: Inquirer, config: SelectFilesQuestion) => Promise<SelectFilesAnswer>
}

