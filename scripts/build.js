/* eslint-disable no-console */
'use strict';

const config = require('../config');
const copyFile = require('../tools/copy-file');
const genHtml = require('../tools/generate-html');
const paths = require('./paths');
const webpack = require('../tools/webpack-promise');
const webpackProdConfig = require('../configs/webpack-prod.config.js');

const log = console.log.bind(console);
const options = {
  config: webpackProdConfig({
    varName: config.build.var,
    filename: config.build.filename,
    outputDir: paths.outputDir,
    entry: paths.entry
  }),
  statsOptions: {
    colors: true
  }
};

Promise.resolve()
  .then(() => log('Bundle...'))
  .then(() => webpack(options))
  .then(msg => log(msg))
  .then(() => log('Generating HTML...'))
  .then(() => genHtml({
    template: paths.templateHtml,
    filename: paths.outputHtml,
    locals: {
      appName: config.appName,
      style: `${config.build.filename}.css`,
      app: `${config.build.filename}.js`,
      varName: config.build.var
    }
  }))
  .then(() => log('Copying resources...\n'))
  .then(() => copyFile({ src: paths.react, dst: paths.outputDir }))
  .then(() => log(`  ${paths.react} => ${paths.outputDir}/`))
  .then(() => copyFile({ src: paths.reactDOM, dst: paths.outputDir }))
  .then(() => log(`  ${paths.reactDOM} => ${paths.outputDir}/\n`))
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
