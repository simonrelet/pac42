/* eslint-disable no-console */
'use strict';

const config = require('../config');
const argv = require('minimist')(process.argv.slice(2), {
  alias: { port: 'p' },
  default: { port: config.dev.port }
});

const paths = require('./paths');
const webpackDevConfig = require('../configs/webpack-dev.config.js');
const webpackDevServer = require('../tools/webpack-dev-server-promise');

const log = console.log.bind(console);
const error = console.error.bind(console);
const options = {
  config: webpackDevConfig({
    port: argv.port,
    outputDir: paths.outputDir,
    entry: paths.devEntry,
    html: paths.devHtml
  }),
  port: argv.port,
  devServerOptions: {
    stats: { colors: true }
  }
};

Promise.resolve()
  .then(() => log('Starting dev server...'))
  .then(() => webpackDevServer(options))
  .then(() => log(`Open a browser on http://localhost:${argv.p}\n`))
  .catch(err => {
    error(err);
    process.exit(1);
  });
