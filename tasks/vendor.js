var gulp        = require('gulp')
var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var concat      = require('gulp-concat')
var path        = require('path')

module.exports = function(config){
  if(!config.vendor) return

  var paths = {
    src: path.join(config.root.src, config.vendor.src),
    dest: path.join(config.root.dest, config.vendor.dest)
  }

  gulp.task('vendor', function() {
    // for each vendor mapping definition
    config.vendor.files.forEach(function(def){
      // run thru definitions' source files, create final 'source' array
      var source = def.source.map(function(s){
        return paths.src + '/' + s;
      });
      return gulp.src( source  )
        .pipe( concat(def.output) )
        .pipe( gulp.dest(paths.dest) )
        .pipe(browserSync.reload({stream:true}))
    })

  })
};
