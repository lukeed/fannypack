/**
 * Example custom task
 */

var gulp        = require('gulp')
var Fannypack   = require('fannypack')
var Pather      = Fannypack.$.Pather
var Handler     = Fannypack.$.ErrorHandler
var BrowserSync = Fannypack.$.BrowserSync

// Addl Requirements
var addl = require('gulp-addl-pkg')

Fannypack.Tasks['custom'] = function(config){
  if(!config.custom) return

  var paths = {
    src: Pather.join(config.root.src, config.custom.src, '/**/*.{' + config.custom.extensions + '}'),
    dest: Pather.join(config.root.src, config.custom.dest)
  }

  return gulp.src(paths.src)
    // do stuff
    .on('error', Handler)
    .pipe(gulp.dest(paths.dest))
    .pipe(BrowserSync.reload({stream:true}))
}
