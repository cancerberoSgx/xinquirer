import { TYPE, Inquirer, Action, Question } from "../main";
import { dialog, OpenDialogOptions } from "electron";

export const selectFilesAction: SelectFilesAction = {
  type: TYPE.SELECT_FILES,
  execute: (host: Inquirer, config: SelectFilesQuestion) => {
    return new Promise(resolve => {
      dialog.showOpenDialog(config.openDialogOptions || defaultOpenDialogOptions),
        (files: string[], bookmarks: string[]) => {
          const answer = {} as any
          answer[config.id] = files
          resolve(answer)
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
export interface SelectFilesAction extends Action{
  execute: (host: Inquirer, config: SelectFilesQuestion) => Promise<string[]>
}