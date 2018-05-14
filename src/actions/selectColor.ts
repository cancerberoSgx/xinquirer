import { dialog, BrowserWindow } from 'electron';
import { ACTION_TYPE, Action, Answer, Inquirer, MessageBoxOptions, Question} from '../types';
import { format } from 'url';
import { join } from 'path';
import { EventEmitter } from 'events';

let child:BrowserWindow
let currentConfig: SelectColorQuestion

export const selectColorAction: SelectColorAction = {
  type: ACTION_TYPE.SELECT_COLOR,
  execute: (inquirer: Inquirer, config: SelectColorQuestion) => {
    return new Promise(resolve => {
      currentConfig = config
      config.title = config.title || 'Select a color',
      // config.buttons = config.buttons|| [config.button || 'OK'],
      config.message = config.message || 'Select a color'

      child = new BrowserWindow({parent: inquirer.getBrowserWindow(), modal: true, show: false})
      child.loadURL(format({
        pathname: join(__dirname, '..', 'assets', 'actions', 'colorpicker.html'),
        protocol: 'file:'
      }))
      child.once('ready-to-show', () => {
        // const size = await child.webContents.executeJavaScript('document.querySelector(".sp-container").getBoundingClientRect()')
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
      colorSelectionEmitter.on('color-selected', (color:string)=>{
        resolve({ id: config.id, value: color})
        child.close()
        child=null
      })
    })
  }
}

const colorSelectionEmitter = new EventEmitter()
export function _colorSelectedHandler(color:string){
  colorSelectionEmitter.emit('color-selected', color)
}
export function _getCurrentConfig(){
  return currentConfig
}
export interface SelectColorQuestion extends Question, MessageBoxOptions {
  /** Message to show to the user */
  message: string
  /** properties to pass directly when creating electron dialog */
  dialog?: MessageBoxOptions
}

export interface SelectColorAnswer extends Answer {
  value: string
}
/** well this is not an inquirer just an alert, but useful to show important info to the user - promise wont be solve until use clicked accept button.  */
export interface SelectColorAction extends Action<SelectColorQuestion, SelectColorAnswer> {
  execute: (inquirer: Inquirer, config: SelectColorQuestion) => Promise<SelectColorAnswer>
}

