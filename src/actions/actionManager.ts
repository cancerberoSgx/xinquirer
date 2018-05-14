import { Action, Inquirer, Answer, Question } from '../types';
import { selectFilesAction, SelectFilesQuestion } from './selectFiles'
import { showMessageAction, ShowMessageQuestion } from './showMessage'

let actions: Action<any, any>[]
const internalActions = [selectFilesAction, showMessageAction]

export function getAllActions():  Action<any, any>[]{
  if(!actions){
    actions = internalActions.concat(externalActions)
  }
  return actions
}

const externalActions: Action<any,any>[] = [] // from third parties
/** third parties can use this to register new action implementations */
export function registerAction(action:Action<Question,Answer>){
  //TODO: check repeated id
  externalActions.push(action)
}
