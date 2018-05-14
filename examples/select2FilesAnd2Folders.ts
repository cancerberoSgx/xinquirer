// import 'loud-rejection/register';
import { ACTION_TYPE } from '../src/types'
import {newInquirer} from '../src/main'
import { ShowMessageAction, ShowMessageQuestion } from '../src/actions/showMessage';
import { SelectFilesQuestion } from '../src/actions/selectFiles';

async function test() {
  const inquirer = newInquirer()
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
      id: 'files', type: ACTION_TYPE.SELECT_FILES, 
      dialog:{title: 'Select a file where to move the class', properties: ['openFile', 'multiSelections']}
    }  as SelectFilesQuestion,

    { 
      id: 'justAMessage2', 
      type: ACTION_TYPE.SHOW_MESSAGE, 
      dialog: {
        title: 'Select 2 folders', 
        message: `

 *******************************************
 *     Now, select exactly two folders     *
 *******************************************`

      }
    } as ShowMessageQuestion,
    { 
      id: 'folders', type: ACTION_TYPE.SELECT_FILES, 
      dialog:{title: 'Select a file where to move the class', properties: ['openDirectory', 'multiSelections'] }
    }  as SelectFilesQuestion
  ])
  console.log(`answer: `, JSON.stringify(answers))
  await inquirer.stop()
}

// try {
  test()
// } catch (error) {
//   console.log(error, error.stack)
// }




