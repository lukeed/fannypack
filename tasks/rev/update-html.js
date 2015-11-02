var gulp       = require('gulp')
var revReplace = require('gulp-rev-replace')
var path       = require('path')

// 5) Update asset references in HTML
module.exports = function(config){
  gulp.task('update-html', function(){
    var manifest = gulp.src(path.join(config.root.dest, "/rev-manifest.json"))
    return gulp.src(path.join(config.root.dest, '/**/*.html'))
      .pipe(revReplace({manifest: manifest}))
      .pipe(gulp.dest(config.root.dest))
  })
};
