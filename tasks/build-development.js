var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')

module.exports = function(config){
  gulp.task('build:development', function(cb) {
    var tasks = getEnabledTasks('development', config)
    gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'rev', cb)
  })
}
