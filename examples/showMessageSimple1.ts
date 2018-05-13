// import 'loud-rejection/register';
import { ACTION_TYPE } from '../src/types'
import {newInquirer} from '../src/main'

async function test() {
  const inquirer = newInquirer()
  await inquirer.start()
  const answers = await inquirer.prompt([
    { 
      id: 'targetFile', type: ACTION_TYPE.SHOW_MESSAGE, 
      label: 'Feel lucky', message: "You win!"
    }
  ])
  console.log(`you selected nothing but let see: `, JSON.stringify(answers))
  await inquirer.stop()
}
// try {
  test()
// } catch (error) {
//   console.log(error, error.stack)
// }