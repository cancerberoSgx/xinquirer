import { ShowMessageQuestion } from '../src/actions/showMessage';
import { create } from '../src/main';
import { ACTION_TYPE } from '../src/types';
import { SelectColorQuestion } from '../src/actions/selectColor';

async function test() {
  const inquirer = create()
  console.log('selectColor')
  await inquirer.start()
  const answers = await inquirer.prompt([
    {
      id: 'color1', type: ACTION_TYPE.SELECT_COLOR,
      title: 'Select a color',
      message: 'Please select a color for you jacket',
    } 
  ]as [SelectColorQuestion])
  console.log(`colorSelected:  `, answers[0].value)
  await inquirer.stop()
}
test()