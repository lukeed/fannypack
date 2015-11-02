var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var path        = require('path')

module.exports = function(config){
  if(!config.tasks.fonts) return

  var paths = {
    src: path.join(config.root.src, config.tasks.fonts.src, '/**/*'),
    dest: path.join(config.root.dest, config.tasks.fonts.dest)
  }

  gulp.task('fonts', function() {
    return gulp.src(paths.src)
      .pipe(changed(paths.dest)) // Ignore unchanged files
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.reload({stream:true}))
  })
};
