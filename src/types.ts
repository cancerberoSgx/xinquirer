import { SelectFilesQuestion, SelectFilesAnswer } from "./actions/selectFiles";
import { ShowMessageQuestion, ShowMessageAnswer } from "./actions/showMessage";

/**
 * Similar API to inquirer.js. Differences: start() must be called before promot() and answers format is sightly different (array of {id, value} objects). 
 */
export interface Inquirer {
  /** will open a new hidden window that will be hosting nexts prompts calls so they are faster. User can call stop any time to close the app window */
  start(): Promise<void>

  /** array of questions that will be presented to the user in order and serially. When all are answered return the array of answers (questoins and answers will have the common if property) */
  prompt(questions: Question[]):  Promise<Answer[]> 

  prompt(questions: SelectFilesQuestion[]):  Promise<SelectFilesAnswer[]> 
  prompt(questions: ShowMessageQuestion[]):  Promise< ShowMessageAnswer[]> 

  /** Destroys the electron main window that was hosting all prompts interactions */
  stop(): Promise<void>
}

export enum ACTION_TYPE {
  SELECT_FILES='select-files',
  SHOW_MESSAGE='show-message'
}

export interface Question {
  id: string
  type: ACTION_TYPE
  // label: string
}

export interface Action<Q extends Question, A extends Answer> {
  type: ACTION_TYPE
  execute: (host: Inquirer, question: Q ) => Promise<Answer>
}

export interface Answer {
  id: string
  value: any
}