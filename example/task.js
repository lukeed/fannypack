/**
 * Example custom task
 */
var Fannypack = require('fannypack')
var gulp      = require('gulp')
// All of Fannypack's Exposed Plugins
var $         = Fannypack.$

// Addl Requirements
var addl1 = require('gulp-addl-pkg')

Fannypack.Tasks['custom'] = function(config){
  if(!config.custom) return

  var paths = {
    src: $.Pather.join(config.root.src, config.custom.src, '/**/*.{' + config.custom.extensions + '}'),
    dest: $.Pather.join(config.root.dest, config.custom.dest)
  }

  gulp.task('custom', function(){
    return gulp.src(paths.src)
      // do stuff
      .on('error', $.ErrorHandler)
      .pipe(gulp.dest(paths.dest))
      .pipe( $.BrowserSync.reload({stream:true}) )
  })
}
