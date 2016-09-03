'use strict';

const resolve = require('../tools/path-resolve')([ __dirname, '..' ]);

module.exports = {
  outputDir: resolve([ 'dist' ]),
  devEntry: resolve([ 'dev-helper', 'index.jsx' ]),
  devHtml: resolve([ 'dev-helper', 'index.html' ]),
  entry: resolve([ 'app', 'client', 'index.jsx' ]),
  templateHtml: resolve([ 'tools', 'html.pug' ]),
  outputHtml: resolve([ 'dist', 'index.html' ]),
  react: resolve([ 'node_modules', 'react', 'dist', 'react.min.js' ]),
  reactDOM: resolve([ 'node_modules', 'react-dom', 'dist', 'react-dom.min.js' ]),
  phaser: resolve([ 'node_modules', 'phaser', 'build', 'phaser.min.js' ])
};
