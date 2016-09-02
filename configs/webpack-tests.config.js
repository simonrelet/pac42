'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const communConfig = require('./webpack-commun.config.js');

module.exports = function() {
  const extractTextPlugin = new ExtractTextPlugin(
    'tests.css',
    { allChunks: true }
  );
  const classesPattern = '[folder]__[local]';

  return merge(communConfig(), {
    devtool: 'inline-source-map',

    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    },

    module: {
      loaders: [{
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: extractTextPlugin.extract(
          'style',
          `css?modules&importLoaders=1&localIdentName=${classesPattern}!sass`
        )
      }]
    },

    plugins: [
      extractTextPlugin
    ]
  });
};
