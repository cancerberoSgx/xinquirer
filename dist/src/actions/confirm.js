"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const types_1 = require("../types");
// TODO: confirm could be configurable: instead of two buttons show the checkbox and only one
exports.confirmAction = {
    type: types_1.ACTION_TYPE.CONFIRM,
    execute: (host, config) => {
        return new Promise(resolve => {
            config.buttons = config.buttons || [config.okButton || 'OK', config.cancelButton || 'Cancel'];
            if (config.title) {
                host.getBrowserWindow().setTitle(config.title);
            }
            electron_1.dialog.showMessageBox(host.getBrowserWindow(), types_1.questionToElectronDialogOption(config), (buttonPressed, checkboxChecked) => {
                resolve({ id: config.id, value: buttonPressed === 0 });
            });
        });
    }
};
//# sourceMappingURL=confirm.js.map