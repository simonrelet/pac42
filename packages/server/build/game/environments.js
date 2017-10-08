'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loggers = require('./loggers');

var _loggers2 = _interopRequireDefault(_loggers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idGenerator = 0;

var create = function create() {
  var logger = (0, _loggers2.default)('environment-' + idGenerator++);
  var events = [];
  // need `undefined` to allow default values in function parameters
  var state = undefined;

  var update = function update(applyEvent, stateWillChange) {
    return function () {
      var newState = events.reduce(function (s, e) {
        return applyEvent(s, e);
      }, state);
      state = stateWillChange(newState);
      events = [];
      logger.info('Updated: ', JSON.stringify(state));
    };
  };

  return {
    get: function get() {
      return state;
    },
    dispatch: function dispatch(event) {
      return events.push(event);
    },
    start: function start(applyEvent, stateWillChange) {
      // call once for initialisation
      update(applyEvent, stateWillChange)();

      setInterval(update(applyEvent, stateWillChange), 40);
      logger.success('Started.');
    }
  };
};

exports.default = { create: create };