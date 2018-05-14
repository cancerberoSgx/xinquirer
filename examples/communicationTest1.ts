import { ShowMessageQuestion } from '../src/actions/showMessage';
import { create } from '../src/main';
import { ACTION_TYPE } from '../src/types';
import { remote, BrowserWindow } from 'electron';
import { format } from 'url';
import { join } from 'path';

async function test() {
  const inquirer = create()
  await inquirer.start()

  let child = new BrowserWindow({parent: inquirer.getBrowserWindow(), modal: true, show: false})
  child.loadURL(format({
    pathname: join(__dirname, '..', 'src', 'assets', 'actions', 'colorpicker.html'),
    protocol: 'file:'
  }))
  child.once('ready-to-show', () => {
    child.show()
  })
  
  // console.log(remote.getCurrentWindow().getTitle())
}
test()