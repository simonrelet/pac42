import loggers from './loggers';

let idGenerator = 0;

const create = () => {
  const logger = loggers('environment-' + idGenerator++);
  let events = [];
  // need `undefined` to allow default values in function parameters
  let state = undefined;

  const update = (applyEvent, stateWillChange) => () => {
    const newState = events.reduce((s, e) => applyEvent(s, e), state);
    state = stateWillChange(newState);
    events = [];
    logger.info('Updated: ', JSON.stringify(state));
  };

  return {
    get: () => state,
    dispatch: event => events.push(event),
    start: (applyEvent, stateWillChange) => {
      setInterval(update(applyEvent, stateWillChange), 40);
      logger.success('Started.');
    },
  };
};

export default { create };
