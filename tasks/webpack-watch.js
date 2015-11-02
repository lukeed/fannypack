var webpackConfig = require('../lib/webpack-multi-config')
var gulp          = require('gulp')
var logger        = require('../lib/compileLogger')
var webpack       = require('webpack')
var browserSync   = require('browser-sync')

module.exports = function(config){
  if(!config.tasks.js) return

  gulp.task('webpack:watch', function(callback) {
    var initialCompile = false

    webpack(webpackConfig('development', config)).watch(200, function(err, stats) {
      logger(err, stats)
      browserSync.reload()
      // On the initial compile, let gulp know the task is done
      if(!initialCompile) {
        initialCompile = true
        callback()
      }
    })
  })
};
