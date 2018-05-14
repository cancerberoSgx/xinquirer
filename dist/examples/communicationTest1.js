"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
const electron_1 = require("electron");
const url_1 = require("url");
const path_1 = require("path");
async function test() {
    const inquirer = main_1.create();
    await inquirer.start();
    let child = new electron_1.BrowserWindow({ parent: inquirer.getBrowserWindow(), modal: true, show: false });
    child.loadURL(url_1.format({
        pathname: path_1.join(__dirname, '..', 'src', 'assets', 'actions', 'colorpicker.html'),
        protocol: 'file:'
    }));
    child.once('ready-to-show', () => {
        child.show();
    });
    // console.log(remote.getCurrentWindow().getTitle())
}
test();
//# sourceMappingURL=communicationTest1.js.map