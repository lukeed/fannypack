/**
 * Example custom task
 */

var config       = require('../index').config
if (!config.tasks.custom) return

var gulp         = require('gulp')
var browserSync  = require('browser-sync')
var handleErrors = require('../lib/handleErrors')
var path         = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.custom.src, '/**/*.{' + config.tasks.custom.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.custom.dest)
}

gulp.task('custom', function(){
  return gulp.src(paths.src)
    // do stuff
    .on('error', handleErrors)
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.reload({stream:true}))
})
