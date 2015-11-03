/*
  Example gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.
*/

var Fannypack = require('fannypack').init

// load custom tasks
require('custom-task-name')

// Initialize Fannypack
Fannypack(function(config){

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
  extensions: ['js', 'coffee'] // extensions to notice
  // ...
}

// Initialize
Fannypack.init()
