"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../src/types");
const main_1 = require("../src/main");
async function test() {
    const inquirer = main_1.create();
    await inquirer.start();
    const answers = await inquirer.prompt([
        {
            id: 'targetFile', type: types_1.ACTION_TYPE.SELECT_FILES,
            title: 'Select a file where to move the class'
        }
    ]);
    console.log(`you choose file: `, JSON.stringify(answers));
    await inquirer.stop();
}
test();
//# sourceMappingURL=selectFileSimpleExample.js.map