'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const communConfig = require('./webpack-commun.config.js');

module.exports = function(options) {
  const extractTextPlugin = new ExtractTextPlugin(
    `${options.filename}.css`,
    { allChunks: true }
  );
  const prodPlugin = new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') }
  });
  const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: true }
  });

  return merge(communConfig(), {
    devtool: 'cheap-module-source-map',

    entry: [ options.entry ],

    externals: { react: 'React' },

    output: {
      path: options.outputDir,
      filename: `${options.filename}.js`,
      publicPath: '/',
      library: options.varName,
      libraryTarget: 'var'
    },

    module: {
      loaders: [{
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: extractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&camelCase!sass'
        )
      }]
    },

    plugins: [
      extractTextPlugin,
      prodPlugin,
      uglifyPlugin
    ]
  });
};
