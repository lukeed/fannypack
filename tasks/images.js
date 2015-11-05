var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var flatten     = require('gulp-flatten')
var gulpif      = require('gulp-if')
var path        = require('path')

module.exports = function(config){
  if(!config.images) return

  var paths = {
    src: path.join(config.root.src, config.images.src, '/**'),
    dest: path.join(config.root.dest, config.images.dest)
  }

  gulp.task('images', function() {
    return gulp.src(paths.src)
      .pipe(changed(paths.dest)) // Ignore unchanged files
      // optionally flatten all directories
      .pipe(gulpif(config.images.flatten, flatten()))
      .pipe(imagemin()) // Optimize
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.reload({stream:true}))
  })
}
