import { Action, Answer, Question } from '../types';
import { confirmAction } from './confirm';
import { selectFilesAction } from './selectFiles';
import { showMessageAction } from './showMessage';

let actions: Action<any, any>[]
const internalActions = [selectFilesAction, showMessageAction, confirmAction]

export function getAllActions(): Action<any, any>[] {
  if (!actions) {
    actions = internalActions.concat(externalActions)
  }
  return actions
}

const externalActions: Action<any, any>[] = [] // from third parties
/** third parties can use this to register new action implementations */
export function registerAction(action: Action<Question, Answer>) {
  //TODO: check repeated id
  externalActions.push(action)
}
