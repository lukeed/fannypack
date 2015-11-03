var gulp         = require('gulp')
var browserSync  = require('browser-sync')
var less         = require('gulp-less')
var sourcemaps   = require('gulp-sourcemaps')
var handleErrors = require('../lib/handleErrors')
var autoprefixer = require('gulp-autoprefixer')
var path         = require('path')

module.exports = function(config){
  if(!config.less) return

  var paths = {
    src: path.join(config.root.src, config.less.src, '/**/*.' + config.less.extensions),
    dest: path.join(config.root.dest, config.less.dest)
  }

  gulp.task('less', function () {
    return gulp.src(paths.src)
      .pipe(sourcemaps.init())
      .pipe(less(config.less.options))
      .on('error', handleErrors)
      .pipe(autoprefixer(config.autoprefixer))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.reload({stream:true}))
  })
};
