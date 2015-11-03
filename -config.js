module.exports = {
  // relative to 'gulpfile.js' location
  root: {
    src: './src',
    dest: './build'
  },

  js: {
    src: 'js',
    dest: 'assets/js',
    extractSharedJs: false,
    entries: {},
    extensions: ['js']
  },

  css: {
    src: 'sass',
    dest: 'assets/css',
    watch: true,
    autoprefixer: {
      browsers: ['last 3 version']
    },
    sass: {
      indentedSyntax: true // Enable .sass syntax (.scss still works too)
    },
    extensions: ['sass', 'scss', 'css']
  },

  html: {
    src: 'html',
    dest: './',
    watch: true,
    htmlmin: {
      collapseWhitespace: true
    },
    extensions: ['html', 'json'],
    // watchOther: './app/views/*/**.html'
  },

  images: {
    src: 'img',
    dest: 'assets/img',
    watch: true,
    extensions: ['jpg', 'png', 'svg', 'gif']
  },

  fonts: {
    src: 'fonts',
    dest: 'assets/fonts',
    watch: true,
    extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
  },

  iconFont: {
    src: 'icons',
    dest: 'assets/fonts',
    watch: true,
    sassDest: 'base',
    extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
  },

  svgSprite: {
    src: 'img/sprites',
    dest: 'assets/img',
    watch: true,
    extensions: ['svg']
  },

  vendor: {
    src: 'js',
    dest: 'assets/js/lib',
    watch: true,
    extensions: ['js'],
    files: []
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
  }
}
