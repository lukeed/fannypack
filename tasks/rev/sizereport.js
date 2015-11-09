var gulp         = require('gulp')
var sizereport   = require('gulp-sizereport')

function repeatString(pattern, number){
  var string = ''
  while (number > 0){
    number--
    string += pattern
  }
  return string
}

// 6) Report sizes
module.exports = function(config){
  gulp.task('size-report', function() {
    var hashedFiles = '/**/*-' + repeatString('[a-z,0-9]', 8)  + '*.*'

    return gulp.src([config.root.dest + hashedFiles, '*!rev-manifest.json'])
      .pipe(sizereport({
          gzip: true
      }))
  })
};
