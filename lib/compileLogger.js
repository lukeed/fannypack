var gutil        = require('gulp-util')
var handleErrors = require('./handleErrors')

function prettifyTime(milli) {
  return (milli > 999) ? (milli / 1000).toFixed(2) + ' s' : milli + ' ms'
}

module.exports = function(err, stats) {
  if(err) throw new gutil.PluginError('webpack', err)

  var statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow'

  if(stats.compilation.errors.length > 0) {
    stats.compilation.errors.forEach(function(error){
      handleErrors(error)
      statColor = 'red'
    })
  } else {
    var compileTime = prettifyTime(stats.endTime - stats.startTime)
    gutil.log(gutil.colors[statColor](stats))
    gutil.log('Compiled with', gutil.colors.cyan('webpack:development'), 'in', gutil.colors.magenta(compileTime))
  }
}
