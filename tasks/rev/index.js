var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')

// If you are familiar with Rails, this task the equivalent of `rake assets:precompile`
module.exports = function(){
  gulp.task('rev', function(cb) {
    gulpSequence(
      // 1) Add md5 hashes to assets referenced by CSS and JS files
      'rev-assets',
      // 2) Update asset references with reved filenames in compiled css + js
      'rev-update-references',
      // 3) Update asset references in HTML
      'update-html',
      // 4) Report filesizes
      'size-report',
    cb)
  })
};
