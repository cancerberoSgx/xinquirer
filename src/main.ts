import { BrowserWindow } from "electron";
import { createWindow } from "./createWindow";
import { selectFilesAction } from './actions/selectFiles';
import { Action, Inquirer, Question, Answer } from "./types";


class InquirerImpl implements Inquirer {
  window: BrowserWindow
  actions: Action[]
  started = false
  async start() {
    this.window = await createWindow()
    this.started = true
    return
  }
  stop(): Promise<void> {
    this.window.close()
    return Promise.resolve()
  }
  prompt(questions: Question[]): Promise<Answer[]> {
    if (!this.started) {
      throw new Error('start() must be called before prompt()')
    }
    const promises = questions.map(async question => {
      const action = this.actions.find(a => a.type === question.type)
      if (!action) {
        throw new Error('Action type not supported: ' + JSON.stringify(question))
      }
      const answer = await action.execute(this, question)
      return answer
    })
    
    return Promise.all(promises)
  }
}

const ALL_ACTIONS: Action[] = []
ALL_ACTIONS.push(selectFilesAction)
export const newInquirer = (): Inquirer => {
  const instance = new InquirerImpl()
  instance.actions = ALL_ACTIONS
  return instance
}
