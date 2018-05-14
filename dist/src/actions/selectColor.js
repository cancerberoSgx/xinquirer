"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const types_1 = require("../types");
const url_1 = require("url");
const path_1 = require("path");
const events_1 = require("events");
let child;
let currentConfig;
exports.selectColorAction = {
    type: types_1.ACTION_TYPE.SELECT_COLOR,
    execute: (inquirer, config) => {
        return new Promise(resolve => {
            currentConfig = config;
            config.title = config.title || 'Select a color',
                // config.buttons = config.buttons|| [config.button || 'OK'],
                config.message = config.message || 'Select a color';
            child = new electron_1.BrowserWindow({ parent: inquirer.getBrowserWindow(), modal: true, show: false });
            child.loadURL(url_1.format({
                pathname: path_1.join(__dirname, '..', 'assets', 'actions', 'colorpicker.html'),
                protocol: 'file:'
            }));
            child.once('ready-to-show', () => {
                // const size = await child.webContents.executeJavaScript('document.querySelector(".sp-container").getBoundingClientRect()')
                child.setSize(500, 350, false);
                child.show();
            });
            child.on('closed', function () {
                child = null;
                resolve({ id: config.id, value: null });
            });
            if (config.title) {
                inquirer.getBrowserWindow().setTitle(config.title);
            }
            colorSelectionEmitter.on('color-selected', (color) => {
                resolve({ id: config.id, value: color });
                child.close();
                child = null;
            });
        });
    }
};
const colorSelectionEmitter = new events_1.EventEmitter();
function _colorSelectedHandler(color) {
    colorSelectionEmitter.emit('color-selected', color);
}
exports._colorSelectedHandler = _colorSelectedHandler;
function _getCurrentConfig() {
    return currentConfig;
}
exports._getCurrentConfig = _getCurrentConfig;
//# sourceMappingURL=selectColor.js.map