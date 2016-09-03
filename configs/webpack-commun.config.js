'use strict';

const resolve = require('../tools/path-resolve')([ __dirname, '..' ]);

module.exports = function() {
  return {
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(svg|png)$/,
          loader: 'file-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    },

    externals: { phaser: 'Phaser' },

    resolve: {
      modulesDirectories: [ 'node_modules' ],
      root: resolve([ 'app', 'client' ]),
      alias: {
        utils: resolve([ 'app', 'client', 'utils' ])
      },
      extensions: [ '', '.js', '.jsx', '.scss', '.json' ]
    }
  };
};
