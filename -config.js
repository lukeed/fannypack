module.exports = {
  // relative to 'gulpfile.js' location
  root: {
    src: './src',
    dest: './build'
  },

  js: {
    src: 'js',
    dest: 'assets/js',
    entries: {},
    watchTask: false, // handled by default
    codeTask: true,
    extractSharedJs: false,
    extensions: ['js']
  },

  sass: {
    src: 'sass',
    dest: 'assets/css',
    watchTask: true,
    codeTask: true,
    options: {
      indentedSyntax: true // Enable .sass syntax (.scss still works too)
    },
    extensions: ['sass', 'scss', 'css']
  },

  html: {
    src: 'html',
    dest: './',
    watchTask: true,
    codeTask: true,
    htmlmin: {
      collapseWhitespace: true
    },
    extensions: ['html', 'json'],
    // watchOther: './app/views/*/**.html'
  },

  images: {
    src: 'img',
    dest: 'assets/img',
    watchTask: true,
    assetTask: true,
    extensions: ['jpg', 'png', 'svg', 'gif']
  },

  fonts: {
    src: 'fonts',
    dest: 'assets/fonts',
    watchTask: true,
    assetTask: true,
    extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
  },

  iconFont: {
    src: 'icons',
    sassDest: 'base', // within 'src'
    dest: 'assets/fonts',
    watchTask: true,
    assetTask: true,
    extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
  },

  svgSprite: {
    src: 'img/sprites',
    dest: 'assets/img',
    watchTask: true,
    assetTask: true,
    extensions: ['svg']
  },

  concat: {
    src: 'js',
    dest: 'assets/js/lib',
    entries: {}, // {'bundle.js': ['./src1.js', './path/src2.js']}
    watchTask: true,
    codeTask: true,
    extensions: ['js']
  },

  clean: {
    ignores: []
  },

  browsersync: {
    port: 3000, // will open to localhost:3000
    proxy: 'local.dev'
  },

  uglify: {
    // https://github.com/mishoo/UglifyJS2#compressor-options
    compress: {
      conditionals:  true,
      comparisons: true,
      booleans: true,
      loops: true,
      join_vars: true,
      drop_console: true // was JUST this
    }
  },

  autoprefixer: {
    browsers: ['last 3 version']
  },
}
