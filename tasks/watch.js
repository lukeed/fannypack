var Config = require('../index').Config
var gulp   = require('gulp')
var path   = require('path')
var watch  = require('gulp-watch')

module.exports = function(config){
  // gulp.task('watch', ['browserSync'], function() {
  gulp.task('watch', function() {
    var watchableTasks = ['tags', 'fonts', 'iconFont', 'images', 'svgSprite', 'css']

    watchableTasks.forEach(function(taskName) {
      var task = config[taskName]
      if(task) {
        var filePattern = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}')
        watch(filePattern, function() { gulp.start(taskName) })
      }
    })
  })
};
