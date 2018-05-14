"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
const types_1 = require("../src/types");
async function test() {
    const inquirer = main_1.create();
    console.log('selectColor');
    await inquirer.start();
    const answers = await inquirer.prompt([
        {
            id: 'color1', type: types_1.ACTION_TYPE.SELECT_COLOR,
            title: 'Select a color',
            message: 'Please select a color for you jacket',
        }
    ]);
    console.log(`colorSelected:  `, answers[0].value);
    await inquirer.stop();
}
test();
//# sourceMappingURL=selectColorSimple.js.map