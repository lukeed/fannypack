/*
  Example gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.
*/

var Fannypack = require('fannypack')

// load custom tasks
require('npm-sourced-task')
require('./path/to/local/task')

// Override config options...
Fannypack.Config.root = {
  src: './src',
  dest: './build'
}

// Turn off tasks
Fannypack.Config.cordova = false

// Add new config definitions
Fannypack.Config.custom = {
  src: 'custom', // relative to root.src
  dest: 'output', // relative to root.dest
  watchTask: true, // should this run in 'watch' task?
  assetTask: true, // should this be run with other asset tasks?
  codeTask: false, // is this core code?
  extensions: ['js', 'coffee'] // extensions to notice
  // ...
}

// Initialize
Fannypack.init()
