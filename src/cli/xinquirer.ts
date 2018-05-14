#!/usr/bin/env node

import { Question } from "../types";

const args = require('yargs-parser')(process.argv.slice(2));

function main(){
  console.log(Object.keys(args))
}

function inquire(question: Question){
// TODO
}
