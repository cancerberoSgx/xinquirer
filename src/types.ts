
/**
 * Similar API to inquirer CLI tool. Differences: start() must be called before promot() and answers format is sightly different
 */
export interface Inquirer {
  /** will open a new hidden window that will be hosting nexts prompts calls so they are faster. User can call stop any time to close the app window */
  start(): Promise<void>
  /** array of questions that will be presented to the user in order and serially. When all are answered return the array of answers (questoins and answers will have the common if property) */
  prompt(questions: Question[]):  Promise<Answer[]> 
  /** Destroys the electron main window that was hosting all prompts interactions */
  stop(): Promise<void>
}

export enum ACTION_TYPE {
  SELECT_FILES
}

export interface Question {
  id: string
  type: ACTION_TYPE
  label: string
}

export interface Action {
  type: ACTION_TYPE
  execute: (host: Inquirer, question: Question) => Promise<Answer>
}

export interface Answer {
  id: string
  value: any
}