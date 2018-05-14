#!/usr/bin/env node

var electron = require('../node_modules/electron/')
var path = require('path')
var proc = require('child_process')

var cliPath = path.join(__dirname, 'cli-main.js' )
var args = [cliPath].concat(process.argv.slice(2))
var child = proc.spawn(electron, args, {stdio: 'inherit'})
child.on('close', function (code) {
  process.exit(code)
})