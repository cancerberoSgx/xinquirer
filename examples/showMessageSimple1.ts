import { ACTION_TYPE } from '../src/types'
import { create } from '../src/main'
import { ShowMessageQuestion } from '../src/actions/showMessage';

async function test() {
  const inquirer = create()
  await inquirer.start()
  const answers = await inquirer.prompt([
    {
      id: 'justAMessage', type: ACTION_TYPE.SHOW_MESSAGE, dialog: {
        title: 'Select 2 files',
        message: 'You win!',
        buttons: ['button1', 'button2', 'button3']
      }
    } as ShowMessageQuestion
  ])
  console.log(`you selected nothing but let see: `, JSON.stringify(answers))
  await inquirer.stop()
}
test()