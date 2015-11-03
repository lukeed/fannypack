var Config = require('../index').Config
var gulp   = require('gulp')
var path   = require('path')
var watch  = require('gulp-watch')

module.exports = function(config){
  // gulp.task('watch', ['browserSync'], function() {
  gulp.task('watch', function() {

    var watchable = [];
    for (var name in config) {
      if (config[name].watch) {
        watchable.push(name)
      }
    }

    watchable.forEach(function(taskName) {
      var task = config[taskName]
      if(task) {
        var filePattern = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}')
        watch(filePattern, function() { gulp.start(taskName) })
      }
    })
  })
};
