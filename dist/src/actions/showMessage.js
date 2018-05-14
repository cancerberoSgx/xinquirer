"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const types_1 = require("../types");
exports.showMessageAction = {
    type: types_1.ACTION_TYPE.SHOW_MESSAGE,
    execute: (host, config) => {
        return new Promise(resolve => {
            config.title = config.title || 'Message',
                config.buttons = config.buttons || [config.button || 'OK'],
                config.message = config.message || 'Generic message';
            if (config.title) {
                host.getBrowserWindow().setTitle(config.title);
            }
            electron_1.dialog.showMessageBox(host.getBrowserWindow(), types_1.questionToElectronDialogOption(config), (buttonPressed, checkboxChecked) => {
                resolve({ id: config.id, value: { buttonPressed, checkboxChecked } });
            });
        });
    }
};
//# sourceMappingURL=showMessage.js.map