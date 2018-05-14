import { BrowserWindow } from "electron";
import { createWindow } from "./createWindow";
import { Action, Inquirer, Question, Answer } from "./types";
import mapSeries from 'p-map-series'// = require('p-map-series')

class InquirerImpl implements Inquirer {
  window: BrowserWindow
  actions: Action<any, any>[]
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
async   prompt(questions: Array<Question>): Promise<Answer[]> {
    if (!this.started) {
      throw new Error('start() must be called before prompt()')
    }

    const results = await mapSeries<Question, Answer>(questions, this.questionMapper.bind(this))

    // console.log(results);  
    return results
    
    // const promises = questions.map(async question => {
    //   console.log('before asking',question.id)
    //   const action = this.actions.find(a => a.type === question.type)
    //   if (!action) {
    //     throw new Error('Action type not supported: ' + JSON.stringify(question))
    //   }
    //   const answer = await action.execute(this, question)
    //   console.log(question.id, answer)
    //   return answer
    // })
    
    // return Promise.all(promises)
  }
  questionMapper(question: Question):Promise<Answer>{
    const action = this.actions.find(a => a.type === question.type)
    if (!action) {
      throw new Error('Action type not supported: ' + JSON.stringify(question))
    }
    return action.execute(this, question)
  }
}



const ALL_ACTIONS: Action<any, any>[] = []

import { selectFilesAction } from './actions/selectFiles'
import { showMessageAction } from './actions/showMessage';;

ALL_ACTIONS.push(selectFilesAction)
ALL_ACTIONS.push(showMessageAction)
export const newInquirer = (): Inquirer => {
  const instance = new InquirerImpl()
  instance.actions = ALL_ACTIONS
  return instance
}
