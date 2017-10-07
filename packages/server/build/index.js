'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = parseInt(process.env.PORT || '5000', 10);
_app2.default.set('port', port);

var handleListeningError = function handleListeningError(error) {
  // handle specific listen errors with friendly messages
  if (error.syscall === 'listen') {
    switch (error.code) {
      case 'EACCES':
        console.error('Port ' + port + ' requires elevated privileges');
        process.exit(1);
        break;

      case 'EADDRINUSE':
        console.error('Port ' + port + ' is already in use');
        process.exit(1);
        break;

      default:
        break;
    }
  }

  throw error;
};

var handleListening = function handleListening() {
  console.log('Listening on port ' + port);
};

var server = _http2.default.createServer(_app2.default);
(0, _game2.default)(server);
server.listen(port);
server.on('error', handleListeningError);
server.on('listening', handleListening);