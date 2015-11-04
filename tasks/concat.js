var gulp        = require('gulp')
var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var concat      = require('gulp-concat')
var path        = require('path')

module.exports = function(config){
  if(!config.concat) return

  var entries = config.concat.entries

  var paths = {
    src: path.join(config.root.src, config.concat.src),
    dest: path.join(config.root.dest, config.concat.dest)
  }

  gulp.task('concat', function() {

    // for each concat mapping definition
    for (var bundle in entries) {
      var files = entries[bundle]
      if (!files.length) { continue }

      // run thru bundles' sources, create final 'source' array
      var sourceFiles = files.map(function(srcFile){
        return path.join(paths.src, srcFile)
      });

      // build the bundle
      gulp.src( sourceFiles )
        .pipe( concat(bundle) )
        .pipe( gulp.dest(paths.dest) )
        .pipe( browserSync.reload({stream:true}) )
    }

  })
};
