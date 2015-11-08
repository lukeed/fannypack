var gulp          = require('gulp')
var browserSync   = require('browser-sync')
var sass          = require('gulp-sass')
var sourcemaps    = require('gulp-sourcemaps')
var handleErrors  = require('../lib/handleErrors')
var autoprefixer  = require('gulp-autoprefixer')
var minify        = require('gulp-minify-css')
var gulpif        = require('gulp-if')
var path          = require('path')

module.exports = function(config){
  if(!config.sass) return

  var paths = {
    src: path.join(config.root.src, config.sass.src, '/**/*.{' + config.sass.extensions + '}'),
    dest: path.join(config.root.dest, config.sass.dest)
  }

  gulp.task('sass', function () {
    return gulp.src(paths.src)
      .pipe(sourcemaps.init())
      .pipe(sass(config.sass.sassOpts))
      .on('error', handleErrors)
      .pipe(autoprefixer(config.autoprefixer))
      .pipe(sourcemaps.write())
      .pipe(gulpif(process.env.NODE_ENV == 'production', minify()))
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.reload({stream:true}))
  })
};
