var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')

module.exports = function(config){
  gulp.task('build:production', function(cb) {
    var tasks = getEnabledTasks('production', config)
    gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'rev', 'uglify', cb)
  })
};
