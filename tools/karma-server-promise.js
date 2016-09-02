'use strict';

const Server = require('karma').Server;

module.exports = function(options) {
  return new Promise((resolve, reject) => {
    new Server(options, code => {
      if (code === 0) {
        resolve();
      } else {
        reject({ code });
      }
    }).start();
  });
};
