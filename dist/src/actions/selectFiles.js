"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const types_1 = require("../types");
exports.selectFilesAction = {
    type: types_1.ACTION_TYPE.SELECT_FILES,
    execute: (host, config) => {
        return new Promise(resolve => {
            if (config.title) {
                host.getBrowserWindow().setTitle(config.title);
            }
            const selection = electron_1.dialog.showOpenDialog(host.getBrowserWindow(), types_1.questionToElectronDialogOption(config), (files, bookmarks) => {
                resolve({ id: config.id, value: { files, bookmarks } });
            });
        });
    }
};
//# sourceMappingURL=selectFiles.js.map