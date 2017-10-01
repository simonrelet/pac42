import http from 'http';
import app from './app';
import game from './game';

const port = parseInt(process.env.PORT || '5000', 10);
app.set('port', port);

const handleListeningError = error => {
  // handle specific listen errors with friendly messages
  if (error.syscall === 'listen') {
    switch (error.code) {
      case 'EACCES':
        console.error(`Port ${port} requires elevated privileges`);
        process.exit(1);
        break;

      case 'EADDRINUSE':
        console.error(`Port ${port} is already in use`);
        process.exit(1);
        break;

      default:
        break;
    }
  }

  throw error;
};

const handleListening = () => {
  console.log(`Listening on port ${port}`);
};

const server = http.createServer(app);
game(server);
server.listen(port);
server.on('error', handleListeningError);
server.on('listening', handleListening);
