var gulp             = require('gulp')
var iconfont         = require('gulp-iconfont')
var generateIconSass = require('./generateIconSass')
var handleErrors     = require('../../lib/handleErrors')
// var package          = require('../../../package.json')
var path             = require('path')

module.exports = function(config){
  if(!config.iconFont) return

  var fontPath = path.join(config.root.dest, config.iconFont.dest)
  var cssPath = path.join(config.root.dest, config.sass.dest)

  var settings = {
    // name: package.name + ' icons',
    src: path.join(config.root.src, config.iconFont.src, '/*.svg'),
    dest: path.join(config.root.dest, config.iconFont.dest),
    sassDest: path.join(config.root.src, config.sass.src, config.iconFont.sassDest),
    template: path.normalize('./gulp/tasks/iconFont/template.sass'),
    sassOutputName: '_icons.sass',
    fontPath: path.relative(cssPath, fontPath),
    className: 'icon',
    options: {
      svg: true,
      timestamp: 0, // see https://github.com/fontello/svg2ttf/issues/33
      fontName: 'icons',
      appendUnicode: true,
      normalize: false,
      formats: config.iconFont.extensions
    }
  }

  gulp.task('iconFont', function() {
    return gulp.src(settings.src)
      .pipe(iconfont(settings.options))
      .on('glyphs', generateIconSass(settings))
      .on('error', handleErrors)
      .pipe(gulp.dest(settings.dest))
  })

  // module.exports = settings
};
