'use strict';

const webpack = require('webpack');

module.exports = function(options) {
  return new Promise((resolve, reject) => {
    webpack(options.config, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats.toString(options.statsOptions));
      }
    });
  });
};
