import {create, ACTION_TYPE, InputQuestion} from 'xinquirer'

async function test() {
  const inquirer = create()
  await inquirer.start()
  const answers = await inquirer.prompt([
    {
      id: 'email', type: ACTION_TYPE.INPUT,
      title: 'Enter your Email',
      message: 'Please enter your email:',
      placeholder: 'example@server.com',
      button: 'Thanks',
      inputType: 'text'
    } 
  ]as [InputQuestion])
  console.log(`email entered:  `, answers[0].value)
  await inquirer.stop()
}
test()