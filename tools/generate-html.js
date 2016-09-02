'use strict';

const fs = require('fs-promise');
const pug = require('pug');

module.exports = function(options) {
  const template = pug.compileFile(options.template, { pretty: '  ' });
  return Promise.resolve(template(options.locals))
    .then(res => fs.writeFile(options.filename, res));
};
