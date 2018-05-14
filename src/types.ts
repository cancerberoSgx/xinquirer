import { SelectFilesQuestion, SelectFilesAnswer } from "./actions/selectFiles";
import { ShowMessageQuestion, ShowMessageAnswer } from "./actions/showMessage";
import { MessageBoxOptions } from "electron";

/**
 * Similar API to inquirer.js. Differences: start() must be called before promot() and answers format is sightly different (array of {id, value} objects). 
 */
export interface Inquirer {
  /** will open a new hidden window that will be hosting nexts prompts calls so they are faster. User can call stop any time to close the app window */
  start(): Promise<void>

  /** 
   * array of questions that will be presented to the user in order and serially. 
   * When all are answered return the array of answers (questions and answers will have the common if property) 
   */
  prompt(questions: Array<Question>): Promise<Answer[]>

  /** Destroys the electron main window that was hosting all prompts interactions */
  stop(): Promise<void>
}

export enum ACTION_TYPE {
  SELECT_FILES = 'select-files',
  SHOW_MESSAGE = 'show-message'
}

export interface Question {
  id: string
  type: ACTION_TYPE
  /**
   * Validate the answer, if not valid return a string with a hint explaining the user why. 
   * If valid return false. You can return a promise resolved with the same semantic for main the validation async
   */
  validate?: QuestionValidate
}
export interface QuestionValidate {
  predicate:  (answer: Answer) => false | string | Promise<false | string>
    dialogOptions: MessageBoxOptions
}
// export type QuestionValidate = {predicate: QuestionValidatePredicate, dialogOptions: MessageBoxOptions}

export interface Action<Q extends Question, A extends Answer> {
  type: ACTION_TYPE
  execute: (host: Inquirer, question: Q) => Promise<Answer>
}

export interface Answer {
  id: string
  value: any
}