import { Action, Inquirer } from '../types';
import { selectFilesAction } from './selectFiles'
import { showMessageAction } from './showMessage'

let actions: Action<any, any>[]
export function getAllActions():  Action<any, any>[]{
  if(!actions){
    actions = [selectFilesAction, showMessageAction]
  }
  return actions
}