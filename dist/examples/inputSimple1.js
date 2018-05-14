"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
const types_1 = require("../src/types");
async function test() {
    const inquirer = main_1.create();
    await inquirer.start();
    const answers = await inquirer.prompt([
        {
            id: 'email', type: types_1.ACTION_TYPE.INPUT,
            title: 'Enter your Email',
            message: 'Please enter your email:',
            placeholder: 'example@server.com',
            button: 'Thanks',
            inputType: 'text'
        }
    ]);
    console.log(`email entered:  `, answers[0].value);
    await inquirer.stop();
}
test();
//# sourceMappingURL=inputSimple1.js.map