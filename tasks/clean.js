var gulp   = require('gulp')
var del    = require('del')
var path   = require('path')
var gutil  = require("gulp-util")

module.exports = function(config){
  gulp.task('clean', function (cb) {
    var dest = config.root.dest

    var files = [ path.join(dest, 'rev-manifest.json') ]

    for(var key in config.tasks) {
      var task = config.tasks[key]
      task.dest = task.dest || './'

      if (!task) {
        continue
      }

      var filePattern = path.join(dest, task.dest)

      if (!task.extensions || !task.extensions.length) {
        filePattern += '/**/*'
      } else {
        filePattern += '/**/*.{' + task.extensions.join(',') + ',map}'
      }

      files.push(filePattern)
    }

    // Don't touch node_modules or source files!
    files.push('!node_modules/**/*')
    files.push('!' + path.join(config.root.src, '/**/*'))

    del(files).then(function (paths) {
      // console.log(paths)
      cb()
    })
  })

}
