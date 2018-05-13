import * as electron from 'electron'
import { BrowserWindow, app } from 'electron'
import { join } from 'path'
import { format } from 'url'

let mainWindow: BrowserWindow

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800, height: 600,
    // show: false
  })
  mainWindow.loadURL(format({
    pathname: join(__dirname, 'assets', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // mainWindow.webContents.openDevTools() // Open the DevTools.

  mainWindow.on('closed', function () {  // Emitted when the window is closed.
    // Dereference the window object, usually you would store windows in an array if your app supports multi windows, this is the time when you should delete the corresponding element.
    mainWindow = null
  })

  electron.dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections']
  }, function (files) {
    if (files !== undefined) {
      console.log(files)
      // handle files
    }
  })
}

// This method will be called when Electron has finished initialization and is ready to create browser windows. Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.on('activate', function () {
//   // On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow()
//   }

// })
