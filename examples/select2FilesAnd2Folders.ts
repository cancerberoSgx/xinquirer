import * as shell from 'shelljs';
import { SelectFilesAnswer, SelectFilesQuestion } from '../src/actions/selectFiles';
import { ShowMessageQuestion } from '../src/actions/showMessage';
import { create } from '../src/main';
import { ACTION_TYPE } from '../src/types';

async function test() {
  const inquirer = create()
  await inquirer.start()
  const answers = await inquirer.prompt([
    {
      id: 'justAMessage',
      type: ACTION_TYPE.SHOW_MESSAGE,
      dialog: {
        title: 'Select 2 files',
        message: `

 *******************************************
 *     Please, select exactly two files    *
 *******************************************`
      }
    } as ShowMessageQuestion,

    {
      id: 'files',
      type: ACTION_TYPE.SELECT_FILES,
      dialog: {
        title: 'Select a file where to move the class',
        properties: ['openFile', 'multiSelections']
      },
      validate: {
        predicate: (answer: SelectFilesAnswer) => {
          if (!answer.value || !answer.value.files || answer.value.files.length !== 2 ||
            answer.value.files.find(f => !shell.test('-f', f))) {
            return 'ERROR: You must select exactly two files. \n\nTIP: press ctrl+click to select multiple files'
          }
        }
      }
    } as SelectFilesQuestion,

    {
      id: 'justAMessage2',
      type: ACTION_TYPE.SHOW_MESSAGE,
      dialog: {
        title: 'Select 2 folders',
        message: `

 *******************************************
 * Good!, now select exactly two folders   *
 *******************************************`
      }
    },
    
    {
      id: 'folders', type: ACTION_TYPE.SELECT_FILES,
      dialog: {
        title: 'Select a file where to move the class',
        properties: ['openDirectory', 'multiSelections']
      },
      validate: {
        predicate: (answer) => {
          if (!answer.value || !answer.value.files || answer.value.files.length !== 2 ||
            answer.value.files.find(f => !shell.test('-d', f))) {
            return 'ERROR: You must select exactly two folders. \n\nTIP: press ctrl+click to select multiple files'
          }
        },
        dialogOptions: {
          buttonLabel: 'I will do it better',
          message: ''
        }
      }
    } as SelectFilesQuestion,
  ])
  console.log(`answer: `, JSON.stringify(answers))
  await inquirer.stop()
}

test()




