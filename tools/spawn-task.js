/* eslint-disable no-console */
'use strict';

const spawn = require('child_process').spawn;
const resolve = require('./path-resolve')([ __dirname, '..' ]);

const options = { stdio: 'inherit' };

module.exports = function(task, args) {
  const bin = resolve([ 'node_modules', task ]);
  const mergedArgs = [ bin ].concat(args || []);

  return new Promise((resolve, reject) => {
    spawn('node', mergedArgs, options)
      .on('close', code => {
        if (code === 0) {
          resolve();
        } else {
          reject({ code });
        }
      });
  });
};
