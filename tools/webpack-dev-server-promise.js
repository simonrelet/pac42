'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

module.exports = function(options) {
  return new Promise((resolve, reject) => {
    new WebpackDevServer(webpack(options.config), options.devServerOptions)
      .listen(options.port, 'localhost', err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
};
