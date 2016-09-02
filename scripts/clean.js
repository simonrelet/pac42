/* eslint-disable no-console */
'use strict';

const del = require('del');
const path = require('path');
const paths = require('./paths');
const resolve = require('../tools/path-resolve')([ __dirname, '..' ]);

const log = console.log.bind(console);
const error = console.error.bind(console);
const filesToDelete = [ paths.outputDir ];

Promise.resolve()
  .then(() => log('Cleaning...'))
  .then(() => del(filesToDelete))
  .then(files => {
    if (files.length > 0) {
      files = files.map(file => path.relative(resolve(), file));
      log(`Deleted paths:\n\n  ${files.join('\n  ')}\n`);
    } else {
      log('Already clean');
    }
    process.exit(0);
  })
  .catch(err => {
    error(err);
    process.exit(1);
  });
