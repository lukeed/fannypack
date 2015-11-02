var compress = require('compression')
var express  = require('express')
var gulp     = require('gulp')
var gutil    = require('gulp-util')
var logger   = require('morgan')
var open     = require('open')
var path     = require('path')

module.exports = function(config){
  var settings = {
    root: path.resolve(process.cwd(), config.root.dest),
    port: process.env.PORT || 5000,
    logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
    staticOptions: {
      extensions: ['php'],
      maxAge: '31556926'
    }
  }

  gulp.task('server', function() {
    var url = 'http://localhost:' + settings.port

    express()
      .use(compress())
      .use(logger(settings.logLevel))
      .use('/', express.static(settings.root, settings.staticOptions))
      .listen(settings.port)

    gutil.log('production server started on ' + gutil.colors.green(url))
    open(url)
  })
};
