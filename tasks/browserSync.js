var browserSync = require('browser-sync')
var gulp        = require('gulp')
var path        = require('path')

module.exports = function(config){
  if (!config.settings.browsersync) {
    return
  }

  gulp.task('browserSync', function() {
    return browserSync(config.settings.browsersync)
  })
}
