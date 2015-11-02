var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var flatten     = require('gulp-flatten')
var path        = require('path')

module.exports = function(config){
  if(!config.tasks.images) return

  var paths = {
    src: path.join(config.root.src, config.tasks.images.src, '/**'),
    dest: path.join(config.root.dest, config.tasks.images.dest)
  }

  gulp.task('images', function() {
    return gulp.src(paths.src)
      .pipe(changed(paths.dest)) // Ignore unchanged files
      .pipe(flatten())
      .pipe(imagemin()) // Optimize
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.reload({stream:true}))
  })
};
