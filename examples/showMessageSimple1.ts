import { ShowMessageQuestion } from '../src/actions/showMessage';
import { create } from '../src/main';
import { ACTION_TYPE } from '../src/types';

async function test() {
  const inquirer = create()
  await inquirer.start()
  const answers = await inquirer.prompt([
    {
      id: 'justAMessage', type: ACTION_TYPE.SHOW_MESSAGE,
      title: 'Select 2 files',
      message: 'You win!',
      button: 'button123'
    } as ShowMessageQuestion
  ])
  console.log(`you selected nothing but let see: `, JSON.stringify(answers))
  await inquirer.stop()
}
test()