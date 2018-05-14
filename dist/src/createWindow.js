"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const url = __importStar(require("url"));
const { webFrame } = require('electron');
function createWindow() {
    return new Promise(resolve => {
        let mainWindow;
        function createWindow_() {
            mainWindow = new electron_1.BrowserWindow({
                width: 100, height: 100, alwaysOnTop: true
            });
            // and load the index.html of the app.
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'assets', 'index.html'),
                protocol: 'file:'
            }));
            // Emitted when the window is closed.
            mainWindow.on('closed', function () {
                // Dereference the window object, usually you would store windows in an array if your app supports multi windows, this is the time when you should delete the corresponding element.
                mainWindow = null;
            });
            resolve(mainWindow);
        }
        // This method will be called when Electron has finished initialization and is ready to create browser windows. Some APIs can only be used after this event occurs.
        electron_1.app.on('ready', createWindow_);
        // Quit when all windows are closed.
        electron_1.app.on('window-all-closed', function () {
            // On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
                electron_1.app.quit();
            }
        });
        electron_1.app.on('activate', function () {
            // On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
            if (mainWindow === null) {
                createWindow_();
            }
        });
    });
}
exports.createWindow = createWindow;
//# sourceMappingURL=createWindow.js.map