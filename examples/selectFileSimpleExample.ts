import { ACTION_TYPE } from '../src/types'
import { create } from '../src/main'
import { SelectFilesQuestion } from '../src/actions/selectFiles';

async function test() {
  const inquirer = create()
  await inquirer.start()
  const answers = await inquirer.prompt([
    {
      id: 'targetFile', type: ACTION_TYPE.SELECT_FILES,
      dialog: { 
        title: 'Select a file where to move the class' 
      }
    } as SelectFilesQuestion
  ])
  console.log(`you choose file: `, JSON.stringify(answers))
  await inquirer.stop()
}

test()