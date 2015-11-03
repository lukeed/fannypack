var gulp          = require('gulp')
var logger        = require('../lib/compileLogger')
var webpack       = require('webpack')
var webpackConfig = require('../lib/webpack-multi-config')

module.exports = function(config){
  if(!config.js) return

  gulp.task('webpack:development', function(callback) {
    webpack(webpackConfig('development', config), function(err, stats) {
      logger(err, stats)
      callback()
    })
  })
};
