"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const fs_1 = require("fs");
const path_1 = require("path");
// example cli
// xinquirer --type select-color --message "Please select a color for your user" 
// xinquirer --configFile questions1.json --out answers.json
// xinquirer --configFile questions1.js --out answers.json
const args = require('yargs-parser')(process.argv.slice(2));
async function main() {
    const tool = main_1.create();
    const questions = args2Questions();
    await tool.start();
    const answers = await tool.prompt(questions);
    if (args.out) {
        fs_1.writeFileSync(args.out, JSON.stringify(answers));
    }
    else {
        console.log(JSON.stringify(answers));
    }
    await tool.stop();
}
exports.main = main;
function args2Questions() {
    if (args.configFile) {
        let answers;
        const configFile = fs_1.readFileSync(args.configFile).toString();
        try {
            answers = JSON.parse(configFile);
        }
        catch (error) {
            answers = require(path_1.resolve(args.configFile));
        }
        return answers;
    }
    else {
        return [args];
    }
}
//# sourceMappingURL=index.js.map