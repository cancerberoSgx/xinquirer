# inquirer, but for the X

like Inquirer.js but for X. Ask user questions showing annoying dialogs on top of the current window. based on electron. node.js API.

**WIP**


# node.js API

TODO. For now look at examples/select2FilesAnd2Folders

# CLI

```sh
npm install -g xinquirer
xinquirer --type select-color --message "Please select a color for your user" 
xinquirer --configFile questions1.json --out answers.json
xinquirer --configFile questions1.js --out answers.json
```
configFile could be json or .js. IF you want to validate inputs then you need to write js functions. 

example: TODO. 


# Widgets supported now:

 * selectFiles
 * showMessage 
 * confirm
 * selectColor

# objectives: 

 * basic components
 * 100% offline
 * support linux windows and mac


# Run examples

Build and run :

```sh
npm run build && npm start -- dist/examples/showMessageSimple1.js
```
|

Just run: 

```sh
npm start -- dist/examples/showMessageSimple1.js
```

# Motivation: 

 
This project is a joke, i'm loading electron jast for this. The reality is that I don't like developing UIs, don't want to waste time on it, and I need to interact with users in a UI application and text / command line in that environment is not good: I need to render dialogs on top of the other app!

I'm starting developing typescript plugins (not for the public just for me - to play!) and I don't want to learn any editor oro IDE API - just with typescript compiler API i have enough. so I need a cheap way of putting inquirer-like dialogs on top of the user's IDE / editors asking him for files, confirmation, etc.

,
    "loud-rejection": "^1.6.0"