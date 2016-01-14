'use strict';

// Get package depends for create vendor chunk
var webpack       = require('webpack');
var path          = require('path');
var TextPlugin    = require('extract-text-webpack-plugin');
var HtmlPlugin    = require('html-webpack-plugin');

/**
 * Global webpack config
 * @param  {[type]} _path [description]
 * @return {[type]}       [description]
 */
module.exports = function(_path) {
  // define local variables
  var dependencies  = Object.keys(require(_path + '/package').dependencies);
  var rootAssetPath = 'app/_assets';

  return {

    entry: {
      app: _path + '/examples/app.js',
      vendors: dependencies,
    },

    output: {
      path: path.join(_path, 'dist'),
      publicPath: '/',
      filename: 'assets/js/[name].[hash].bundle.js',
      chunkFilename: '[id].chunk.js',
      hash: true
    },

    resolve: {
      alias: {
        _app: path.join(_path, 'examples/'),
        _sir: path.join(_path, 'src/'),
      },
      extensions: module.exports = ['', '.js', '.styl'],
      modulesDirectories: ['node_modules']
    },

    module: {
      loaders: [
        { test: /\.jade$/, loader: 'jade-loader' },
        { test: /\.css$/,  loader: TextPlugin.extract('style-loader', 'css-loader') },
        { test: /\.js?$/,  include: [/src/], exclude: [/node_modules/], loader: 'babel-loader' },
        { test: /\.styl$/, loader: TextPlugin.extract('style-loader', 'css-loader!stylus-loader') },
        { test: /\.(png|ico|jpg|jpeg|gif|ttf|eot|woff|woff2|svg)$/i, loaders: ['file?context=' + rootAssetPath + '&name=assets/[ext]/[name].[hash].[ext]'] }
      ]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/js/vendors.[hash].js'),
      new TextPlugin('assets/css/[name].[hash].css'),

      // Application entry point
      new HtmlPlugin({
        title: 'sir ivan',
        chunks: ['app', 'vendors'],
        filename: 'index.html',
        template: 'examples/index.html'
      })
    ]
  };
};
