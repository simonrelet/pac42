'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const communConfig = require('./webpack-commun.config.js');

module.exports = function(options) {
  const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: options.html,
    filename: 'index.html',
    inject: 'body'
  });
  const classesPattern = '[name]__[local]___[hash:base64:5]';

  return merge(communConfig(), {
    devtool: 'eval',

    entry: [
      `webpack-dev-server/client?http://localhost:${options.port}`,
      'webpack/hot/only-dev-server',
      options.entry
    ],

    output: {
      path: options.outputDir,
      publicPath: '/'
    },

    module: {
      loaders: [{
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style',
          `css?modules&importLoaders=1&localIdentName=${classesPattern}`,
          'sass'
        ]
      }]
    },

    plugins: [
      hotModuleReplacementPlugin,
      htmlWebpackPlugin
    ]
  });
};
