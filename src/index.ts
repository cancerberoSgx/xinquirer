import {newInquirer, TYPE} from './main' 

async function test(){

  const inquirer = newInquirer()
  const answers = await inquirer.prompt([
    {id: 'targetFile', type: TYPE.SELECT_FILES, label: 'Select a file where to move the class'}
  ])
  console.log(answers)
}