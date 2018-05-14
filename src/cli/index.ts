


import { create } from "../main";
import { writeFileSync, readFileSync } from "fs";
import { resolve } from "path";

// example cli
// xinquirer --type select-color --message "Please select a color for your user" 
// xinquirer --configFile questions1.json --out answers.json
// xinquirer --configFile questions1.js --out answers.json


const args = require('yargs-parser')(process.argv.slice(2));

export async function main() {
  const tool = create()
  const questions = args2Questions()

  await tool.start()
  const answers = await tool.prompt(questions)
  
  if(args.out){
    writeFileSync(args.out, JSON.stringify(answers))
  }
  else{
    console.log(JSON.stringify(answers));
  }
  await tool.stop()
}

function args2Questions(){
  if(args.configFile){
    let answers
    const configFile = readFileSync(args.configFile).toString()
    try {
      answers = JSON.parse(configFile)
    } catch (error) {
      answers = require(resolve(args.configFile))
    }
    return answers
  }
  else {
    return [args]
  }
}