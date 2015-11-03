/**
 * Example custom task
 */

var Fannypack        = require('fannypack')
var gulp         = require('gulp')

// Addl Requirements
var browserSync  = require('browser-sync')
var handleErrors = require('../lib/handleErrors')
var path         = require('path')

Fannypack.Tasks['custom'] = function(config){
  if(!config.custom) return

  var paths = {
    src: path.join(config.root.src, config.custom.src, '/**/*.{' + config.custom.extensions + '}'),
    dest: path.join(config.root.src, config.custom.dest)
  }

  return gulp.src(paths.src)
    // do stuff
    .on('error', handleErrors)
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.reload({stream:true}))
}
