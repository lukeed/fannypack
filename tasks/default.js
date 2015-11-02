var gulp            = require('gulp')
var gulpSequence    = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')

module.exports = function(config){
  gulp.task('default', function(cb) {
    var tasks = getEnabledTasks('watch', config)
    gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'browserSync', 'watch', cb)
  })
};
