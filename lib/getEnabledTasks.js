var compact = require('lodash/array/compact')


module.exports = function(env, config) {
  var jsTasks = {
    watch: 'webpack:watch',
    development: 'webpack:development',
    production: 'webpack:production'
  }

  // Group tasks by what can be run in parallel
  var assetTasks = [], codeTasks = []

  for (var name in config) {
    if (config[name].assetTask) {
      assetTasks.push(name)
    } else if (config[name].codeTask) {
      codeTasks.push(name)
    }
  }

  var matchFilter = function(task) {
    if(config[task]) {
      if(task === 'js') {
        task = jsTasks[env] || jsTask.watch
      }
      return task
    }
  }

  return {
    assetTasks: compact(assetTasks.map(matchFilter)),
    codeTasks: compact(codeTasks.map(matchFilter))
  }
}
