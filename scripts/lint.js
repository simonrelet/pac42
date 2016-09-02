/* eslint-disable no-console */
'use strict';

const path = require('path');
const resolve = require('../tools/path-resolve')([ __dirname, '..' ]);
const spawn = require('../tools/spawn-task');
const paths = require('./paths');

const log = console.log.bind(console);
const args = [
  '.',
  `--ext`,
  '.js,.jsx',
  `--ignore-pattern`,
  `${path.relative(resolve(), paths.outputDir)}`
];

Promise.resolve()
  .then(() => log('Linting...'))
  .then(() => spawn('eslint/bin/eslint', args))
  .then(() => {
    log('No linting error');
    process.exit(0);
  })
  .catch(err => process.exit(err.code));
