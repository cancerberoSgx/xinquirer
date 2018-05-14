import { ShowMessageQuestion } from '../src/actions/showMessage';
import { create } from '../src/main';
import { ACTION_TYPE } from '../src/types';

async function test() {
  const inquirer = create()
  await inquirer.start()
  const answers = await inquirer.prompt([
    {
      id: 'color1', type: ACTION_TYPE.SELECT_COLOR,
      title: 'Select a color',
      message: 'Please select a color for you jacket',
    } as ShowMessageQuestion
  ])
  console.log(`you selected nothing but let see: `, JSON.stringify(answers))
  await inquirer.stop()
}
test()