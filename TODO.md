# TODO 
 
 * default values 
 * enhancement - question property that allows to not execute that step according to some predicate and proceed with the next. predicate receive current answersr. 
 * input inputType validates but tooltip not shown
 * input - if we validate with inputType will be different to other actions - shound't we provide validator predicate and validate against that ? 



# IDEAS

  * https://electronjs.org/docs/tutorial/notifications
  * https://electronjs.org/docs/tutorial/progress-bar
  * https://electronjs.org/docs/tutorial/native-file-drag-drop
  * read from clikblard (inquire) https://electronjs.org/docs/api/clipboard
  * inquier descktop capture https://electronjs.org/docs/api/desktop-capturer



# notes

create child windows
  const {BrowserWindow} = require('electron')
  
  let child = new BrowserWindow({parent: top, modal: true, show: false})
  child.loadURL('https://github.com')
  child.once('ready-to-show', () => {
    child.show()
  })


  https://electronjs.org/docs/api/remote
  
from server to browser
  mainWindow.webContents.executeJavaScript('document.write("<p>sebskdfjhskjdfhksjdfhksjdhfksjdhfkjsdhf</p>")')



from browsers to server
const communication = require('electron').remote.require(path.join(__dirname, '..', 'communication'))
communication.exported1('hello hello !!!')
  