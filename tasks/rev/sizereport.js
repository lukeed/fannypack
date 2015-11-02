var gulp         = require('gulp')
var repeatString = require('../../lib/repeatString')
var sizereport   = require('gulp-sizereport')

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
