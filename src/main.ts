import { BrowserWindow } from 'electron';
import 'hard-rejection/register';
import mapSeries from 'p-map-series';
import { getAllActions } from './actions/actionManager';
import { ShowMessageQuestion } from './actions/showMessage';
import { createWindow } from './createWindow';
import { ACTION_TYPE, Action, Answer, Inquirer, Question, MessageBoxOptions } from './types';
import { SelectFilesQuestion } from './actions/selectFiles';

class InquirerImpl implements Inquirer {
  constructor(actions: Action<any, any>[]) {
    this.actions = actions
  }
  private window: BrowserWindow|undefined
  private actions: Action<any, any>[]
  private started = false

  getBrowserWindow(): BrowserWindow{
    if(! this.window){
      throw new Error('You must call start() before getBrowserWindow()')
    }
    else {
      return this.window
    }
  }
  
  async start() {
    this.window = await createWindow()
    this.started = true
    return
  }

  stop(): Promise<void> {
    if(this.window) {this.window.close()}
    return Promise.resolve()
  }

  async prompt(questions: Array<Question>): Promise<Answer[]> {
    if (!this.started) {
      throw new Error('start() must be called before prompt()')
    }

    const results = await mapSeries<Question, Answer>(questions, async (question: Question): Promise<Answer> => {
      const action = this.actions.find(a => a.type === question.type)
      if (!action) {
        throw new Error('Action type not supported: ' + JSON.stringify(question))
      }
      let invalid: string | false = 'first time is never valid'
      let answer
      do {
        answer = await action.execute(this, question)
        invalid = false
        if (question.validate && question.validate.predicate) {
          invalid = await question.validate.predicate(answer)
          if (invalid) {
            await this.showInvalidMessage(invalid, question.validate.dialogOptions)
          }
        }
      } while (invalid);
      return answer
    })
    return results
  }

  private showInvalidMessage(message: string, dialogOptions?: MessageBoxOptions): Promise<Answer[]> {
    const finalDialogOptions = Object.assign({}, dialogOptions||{}, {
      title: 'Invalid Selection',
      message: message, 
      type: 'error'
    })
    return this.prompt([
      {
        id: 'justAMessage',
        type: ACTION_TYPE.SHOW_MESSAGE,
        dialog: finalDialogOptions
      } as ShowMessageQuestion
    ])
  }
}


export const create = (): Inquirer => {
  const instance = new InquirerImpl(getAllActions())
  return instance
}
