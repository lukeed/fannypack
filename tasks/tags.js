var config      = require('../index').config
if(!config.tasks.tags) return

var browserSync = require('browser-sync')
// var changed     = require('gulp-changed')
var gulp        = require('gulp')
var path        = require('path')
var riot        = require('gulp-riot')
var concat      = require('gulp-concat')
var insert      = require('gulp-insert')

var paths = {
  src: path.join(config.root.src, config.tasks.tags.src, '/**/*'),
  dest: path.join(config.root.src, config.tasks.tags.dest) // dump into src/javascripts
}

gulp.task('tags', function() {
  return gulp.src(paths.src)
    // .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe( concat(config.tasks.tags.output) )
    .pipe( riot({compact: true}) )
    // insert riot dependency declaration
    .pipe( insert.prepend("import riot from 'riot';\n\n") )
    .pipe( gulp.dest(paths.dest) )
    .pipe(browserSync.reload({stream:true}))
})
