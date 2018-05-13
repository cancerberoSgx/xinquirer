// import 'loud-rejection/register';
import { ACTION_TYPE } from '../src/types'
import {newInquirer} from '../src/main'

async function test() {
  const inquirer = newInquirer()
  await inquirer.start()
  const answers = await inquirer.prompt([
    { 
      id: 'targetFile', type: ACTION_TYPE.SELECT_FILES, 
      label: 'Select a file where to move the class' 
    }
  ])
  console.log(`you choose file: `, answers)
  await inquirer.stop()
}
// try {
  test()
// } catch (error) {
//   console.log(error, error.stack)
// }