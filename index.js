/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.
*/

var Fannypack = {}

Fannypack.Config = require('./-config')
Fannypack.Tasks = require('require-dir')('./tasks', {recurse: true})

// Make Core Packages Available
Fannypack.$ = {
  Autoprefix: require('gulp-autoprefixer'),
  BrowserSync: require('browser-sync'),
  Changed: require('gulp-changed'),
  Concat: require('gulp-concat'),
  ErrorHandler: require('./lib/handleErrors'),
  Flatten: require('gulp-flatten'),
  If: require('gulp-if'),
  Pather: require('path'),
  Render: require('gulp-nunjucks-render'),
  Sequence: require('gulp-sequence'),
  SourceMaps: require('gulp-sourcemaps'),
  Util: require('gulp-util')
}

function runAllTasks(object, config) {
  for (var name in object) {
    if (typeof object[name] === 'function') {
      object[name](config)
    } else if (typeof object[name] === 'object') {
      runAllTasks(object[name], config)
    }
  }
}

Fannypack.init = function(){
  return runAllTasks(this.Tasks, this.Config)
}

module.exports = Fannypack
