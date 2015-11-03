var browserSync  = require('browser-sync')
var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var handleErrors = require('../lib/handleErrors')
var htmlmin      = require('gulp-htmlmin')
var path         = require('path')
var render       = require('gulp-nunjucks-render')

module.exports = function(config){
  if (!config.html) return

  var paths = {
    src: [path.join(config.root.src, config.html.src, '/**/*.html')],
    dest: path.join(config.root.dest, config.html.dest),
  }

  gulp.task('html', function() {
    var nunjucksSrc = [path.join(config.root.src, config.html.src)]
    render.nunjucks.configure(nunjucksSrc, {watch: false })

    return gulp.src(paths.src)
      .pipe(render())
      .on('error', handleErrors)
      .pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.html.htmlmin)))
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
  })
};
