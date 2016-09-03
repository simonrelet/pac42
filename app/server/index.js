/* eslint new-cap: "off" */
/* eslint no-console: "off" */
'use strict';

const config = require('../config');
const io = require('socket.io')(config.server.port);
const Map = require('immutable').Map;

let idGen = 1;
let clients = Map();

io.on('connection', socket => {
  const id = idGen++;

  socket.on('disconnect', () => {
    clients = clients.remove(id);
    console.log(`Client ${id} left`);
  });

  socket.emit('greetings', { id }, res => {
    // res = { name: string, type: string }
    clients = clients.set(id, res);
    console.log(`New client: ${JSON.stringify(res, null, '  ')}`);
  });
});

console.log(`Listening on port ${config.server.port}`);
