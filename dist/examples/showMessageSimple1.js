"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
const types_1 = require("../src/types");
async function test() {
    const inquirer = main_1.create();
    await inquirer.start();
    const answers = await inquirer.prompt([
        {
            id: 'justAMessage', type: types_1.ACTION_TYPE.SHOW_MESSAGE,
            title: 'Select 2 files',
            message: 'You win!',
            button: 'button123'
        }
    ]);
    console.log(`you selected nothing but let see: `, JSON.stringify(answers));
    await inquirer.stop();
}
test();
//# sourceMappingURL=showMessageSimple1.js.map