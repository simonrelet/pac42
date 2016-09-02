'use strict';

const resolve = require('../tools/path-resolve')([ __dirname, '..' ]);
const webpackTestsConfig = require('./webpack-tests.config.js');

const entry = resolve([ 'app', 'tests', 'entry.js' ]);
const polyfill = resolve([ 'node_modules', 'babel-polyfill', 'dist', 'polyfill.js' ]);

module.exports = function(config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    files: [
      polyfill,
      entry
    ],
    frameworks: [ 'mocha' ],
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter'
    ],
    preprocessors: {
      [`${entry}`]: [ 'webpack' ]
    },
    reporters: [ 'mocha' ],
    webpack: webpackTestsConfig()
  });
};
