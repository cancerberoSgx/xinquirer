import { BrowserWindow, app } from 'electron';
import * as path from 'path';
import * as url from 'url';

const {webFrame} = require('electron')
  



export function createWindow(): Promise<BrowserWindow> {
  return new Promise(resolve => {
    let mainWindow: BrowserWindow | null
    function createWindow_() {
      mainWindow = new BrowserWindow({  // Create the browser window.
        width: 100, height: 100, alwaysOnTop: true
      })
      // and load the index.html of the app.
      mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'assets', 'index.html'),
        protocol: 'file:'
      }))
      // Emitted when the window is closed.
      mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows in an array if your app supports multi windows, this is the time when you should delete the corresponding element.
        mainWindow = null
      })
      resolve(mainWindow)
    }
    // This method will be called when Electron has finished initialization and is ready to create browser windows. Some APIs can only be used after this event occurs.
    app.on('ready', createWindow_)
    // Quit when all windows are closed.
    app.on('window-all-closed', function () {
      // On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
    app.on('activate', function () {
      // On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
      if (mainWindow === null) {
        createWindow_()
      }
    })
  })
}
