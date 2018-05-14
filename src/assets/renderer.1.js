// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// alert('before')
const remote = require('electron').remote
const path = require('path')
const communication = require('electron').remote.require(path.join(__dirname, '..', 'communication'))
communication.exported1('hello hello !!!')
// alert('seba '+remote.process.cwd())

// seba('helllsdkjflskdjf')