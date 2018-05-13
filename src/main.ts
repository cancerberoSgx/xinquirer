import { createWindow } from "./createWindow";


class InquirerImpl implements Inquirer {

  actions: Action[] = []
  started = false

  async start() {
    await createWindow()
    this.started = true
    return
  }

  prompt(questions: Question[]): Promise<Answer>[] {
    return questions.map(async question => {
      const action = this.actions.find(a => a.type === question.type)
      if (!action) {
        throw new Error('Action type not supported: ' + JSON.stringify(question))
      }
      const answer = await action.execute(this, question)
      return answer
    })
  }

  registerAction(action: Action) {
    this.actions.push(action)
  }
}

export const newInquirer = (): Inquirer => {
  return new InquirerImpl()
}

export enum TYPE {
  SELECT_FILES
}

export interface Question {
  id: string
  type: TYPE
  label: string
}

export interface Inquirer {
  prompt(questions: Question[]): Promise<any>[]
}
export interface Action {
  type: TYPE
  execute: (host: Inquirer, question: Question) => Promise<any>
}

export interface Answer {
  id: string
  value: any
}


// last import all types so they get combined and register. TODO: IOC
import { selectFilesAction } from './types/selectFiles'
// ...