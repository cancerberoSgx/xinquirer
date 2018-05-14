"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const shell = __importStar(require("shelljs"));
const main_1 = require("../src/main");
const types_1 = require("../src/types");
async function test() {
    const inquirer = main_1.create();
    await inquirer.start();
    const confirmAnswer = await inquirer.prompt([
        {
            id: 'initialConfirm',
            type: types_1.ACTION_TYPE.CONFIRM,
            title: 'Confirm',
            message: `

*******************************************
*    Are you sure you want to proceed     *
*******************************************`
        }
    ]);
    if (!confirmAnswer[0].value) {
        return await inquirer.stop();
    }
    const answers = await inquirer.prompt([
        {
            id: 'justAMessage',
            type: types_1.ACTION_TYPE.SHOW_MESSAGE,
            title: 'Select 2 files',
            message: `

*******************************************
*     Please, select exactly two files    *
*******************************************`
        },
        {
            id: 'files',
            type: types_1.ACTION_TYPE.SELECT_FILES,
            title: 'Select a file where to move the class',
            properties: ['openFile', 'multiSelections'],
            validate: {
                predicate: (answer) => {
                    if (!answer.value || !answer.value.files || answer.value.files.length !== 2 ||
                        answer.value.files.find(f => !shell.test('-f', f))) {
                        return 'ERROR: You must select exactly two files. \n\nTIP: press ctrl+click to select multiple files';
                    }
                }
            }
        },
        {
            id: 'justAMessage2',
            type: types_1.ACTION_TYPE.SHOW_MESSAGE,
            title: 'Select 2 folders',
            message: `

*******************************************
* Good!, now select exactly two folders   *
*******************************************`
        },
        {
            id: 'folders', type: types_1.ACTION_TYPE.SELECT_FILES,
            title: 'Select a file where to move the class',
            properties: ['openDirectory', 'multiSelections'],
            validate: {
                predicate: (answer) => {
                    if (!answer.value || !answer.value.files || answer.value.files.length !== 2 ||
                        answer.value.files.find(f => !shell.test('-d', f))) {
                        return 'ERROR: You must select exactly two folders. \n\nTIP: press ctrl+click to select multiple files';
                    }
                },
                msgConfig: {
                    button: 'I will do it better',
                    message: 'ERROR: You must select exactly two folders. \n\nTIP: press ctrl+click to select multiple files'
                }
            }
        },
    ]);
    console.log(`answer: `, JSON.stringify(answers));
    await inquirer.stop();
}
test();
//# sourceMappingURL=select2FilesAnd2Folders.js.map