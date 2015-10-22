var browserSync = require('browser-sync')
var config      = require('../index').config
var gulp        = require('gulp')
var path        = require('path')

gulp.task('browserSync', function() {
  return browserSync(config.settings.browsersync)
})
