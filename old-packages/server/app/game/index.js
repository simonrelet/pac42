import socketIO from 'socket.io';
import loggers from './loggers';
import systems from './systems';

const logger = loggers('game');

const update = (io, environment) => () => {
  logger.info('Sending environment');
  io.emit('update', JSON.stringify(environment.get()));
};

const getMapStringifiedField = ({ tiles }) => ({ tiles });

export default server => {
  const io = socketIO(server);

  logger.info('Starting...');

  const system = systems.create();
  const stringifiedMap = JSON.stringify(getMapStringifiedField(system.map));

  io.on('connection', socket => {
    logger.info('Client connected.');
    socket.on('disconnect', reason =>
      logger.info('Client disconnected:', reason),
    );
    socket.on('error', error => logger.error('Client error:', error));
    socket.emit('map', stringifiedMap);
  });

  setInterval(update(io, system.environment), 40);
  logger.success('Started.');
};
