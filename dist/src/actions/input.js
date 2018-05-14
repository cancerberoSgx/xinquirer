"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const types_1 = require("../types");
const url_1 = require("url");
const path_1 = require("path");
const events_1 = require("events");
let child;
let currentConfig;
exports.inputAction = {
    type: types_1.ACTION_TYPE.INPUT,
    execute: (inquirer, config) => {
        return new Promise(resolve => {
            currentConfig = config;
            config.title = config.title || 'Enter text',
                config.message = config.message || 'Enter text';
            child = new electron_1.BrowserWindow({ parent: inquirer.getBrowserWindow(), modal: true, show: false });
            child.loadURL(url_1.format({
                pathname: path_1.join(__dirname, '..', 'assets', 'actions', 'input.html'),
                protocol: 'file:'
            }));
            child.once('ready-to-show', () => {
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
            inputEmitter.on('input-entered', (color) => {
                resolve({ id: config.id, value: color });
                child.close();
                child = null;
            });
        });
    }
};
const inputEmitter = new events_1.EventEmitter();
function _inputHandler(value) {
    inputEmitter.emit('input-entered', value);
}
exports._inputHandler = _inputHandler;
function _getCurrentConfig() {
    return currentConfig;
}
exports._getCurrentConfig = _getCurrentConfig;
//# sourceMappingURL=input.js.map