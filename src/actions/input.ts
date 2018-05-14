import { dialog, BrowserWindow } from 'electron';
import { ACTION_TYPE, Action, Answer, Inquirer, MessageBoxOptions, Question} from '../types';
import { format } from 'url';
import { join } from 'path';
import { EventEmitter } from 'events';

let child:BrowserWindow
let currentConfig: InputQuestion

export const inputAction: InputAction = {
  type: ACTION_TYPE.INPUT,
  execute: (inquirer: Inquirer, config: InputQuestion) => {
    return new Promise(resolve => {
      currentConfig = config
      config.title = config.title || 'Enter text',
      config.message = config.message || 'Enter text'

      child = new BrowserWindow({parent: inquirer.getBrowserWindow(), modal: true, show: false})
      child.loadURL(format({
        pathname: join(__dirname, '..', 'assets', 'actions', 'input.html'),
        protocol: 'file:'
      }))
      child.once('ready-to-show', () => {
        child.setSize(500, 350, false)
        child.show()
      })
      child.on('closed', function () {
        child = null
        resolve({ id: config.id, value: null})
      })
      if (config.title) {
        inquirer.getBrowserWindow().setTitle(config.title)
      }
      inputEmitter.on('input-entered', (color:string)=>{
        resolve({ id: config.id, value: color})
        child.close()
        child=null
      })
    })
  }
}

const inputEmitter = new EventEmitter()
export function _inputHandler(value:string){
  inputEmitter.emit('input-entered', value)
}
export function _getCurrentConfig(){
  return currentConfig
}
export interface InputQuestion extends Question {
  /** Message to show to the user */
  message: string
  /** window title */
  title?:string
  /** submit button label */
  button?:string
  /** input placeholder (html placeholder) */
  placeholder?:string
  /** if a text area (multiple line text) */
  textarea?:boolean
  /** text, password, email, phone, color,  - any valid html5 input type - default is text. doesn't work with textarea */
  inputType?:string

  //TODO: input in html5 accept regexfor validation
}

export interface InputAnswer extends Answer {
  value: string
}
/** well this is not an inquirer just an alert, but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface InputAction extends Action<InputQuestion, InputAnswer> {
  execute: (inquirer: Inquirer, config: InputQuestion) => Promise<InputAnswer>
}

