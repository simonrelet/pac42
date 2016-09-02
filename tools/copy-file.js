'use strict';

const fs = require('fs-promise');
const path = require('path');

module.exports = function(options) {
  const basename = path.basename(options.src);
  return fs.readFile(options.src, 'utf8')
    .then(content => fs.writeFile(path.resolve(options.dst, basename), content));
};
