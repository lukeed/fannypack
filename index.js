/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.
*/

var config = require('./-config')

var init = function(customize){
  config = customize(config)
  // Require all tasks in /tasks, including subfolders
  require('require-dir')('./tasks', { recurse: true })
}

exports.config = config
exports.init = init
