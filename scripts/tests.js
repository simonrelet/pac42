/* eslint-disable no-console */
'use strict';

const config = require('../config');
const argv = require('minimist')(process.argv.slice(2), {
  boolean: [ 'watch' ],
  alias: {
    port: 'p',
    watch: 'w'
  },
  default: {
    port: config.tests.port,
    watch: false
  }
});

const karma = require('../tools/karma-server-promise');
const resolve = require('../tools/path-resolve')([ __dirname, '..' ]);

const log = console.log.bind(console);
const options = {
  port: argv.port,
  configFile: resolve([ 'configs', 'karma.conf.js' ]),
  singleRun: !argv.watch
};

Promise.resolve()
  .then(() => log('Starting tests...'))
  .then(() => karma(options))
  .then(() => process.exit(0))
  .catch(err => process.exit(err.code));
