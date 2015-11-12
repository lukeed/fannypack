var path            = require('path')
var webpack         = require('webpack')

module.exports = function(env, config) {
  var jsSrc = path.resolve(config.root.src, config.js.src)
  var jsDest = path.resolve(config.root.dest, config.js.dest)
  var publicPath = path.join(config.js.dest, '/')

  var filenamePattern = '[name].js'
  // var filenamePattern = env === 'production' ? '[name]-[hash].js' : '[name].js'
  var extensions = config.js.extensions.map(function(extension) {
    return '.' + extension
  })

  var webpackConfig = {
    context: jsSrc,
    plugins: [],
    resolve: {
      extensions: [''].concat(extensions)
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: require.resolve('babel-loader'),
          query: {
            presets: [ require.resolve('babel-preset-es2015') ]
          },
          exclude: /(node_modules|bower_components)/
        }
      ]
    }
  }

  if(env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = config.js.entries

    webpackConfig.output = {
      path: path.normalize(jsDest),
      filename: filenamePattern,
      publicPath: publicPath
    }

    if(config.js.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern,
        })
      )
    }
  }

  if(env === 'development') {
    webpackConfig.devtool = 'source-map'
    webpack.debug = true
  }

  if(env === 'production') {
    process.env.NODE_ENV = 'production'
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(config.uglify),
      new webpack.NoErrorsPlugin()
    )
  }

  return webpackConfig
}
