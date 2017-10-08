'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loggers = require('./loggers');

var _loggers2 = _interopRequireDefault(_loggers);

var _maps = require('./maps');

var _maps2 = _interopRequireDefault(_maps);

var _positions = require('./positions');

var _environments = require('./environments');

var _environments2 = _interopRequireDefault(_environments);

var _players = require('./players');

var _players2 = _interopRequireDefault(_players);

var _random = require('./players/random');

var _random2 = _interopRequireDefault(_random);

var _rules = require('./rules');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PLAYERS_AI = [(0, _random2.default)({ name: 'Raymond', type: 'pacman' }), (0, _random2.default)({ name: 'Liza', type: 'pacman' }), (0, _random2.default)({ name: 'Frank', type: 'pacman' }), (0, _random2.default)({ name: 'Bob', type: 'pacman' }), (0, _random2.default)({ name: 'Blinky', type: 'ghost' }), (0, _random2.default)({ name: 'Pinky', type: 'ghost' }), (0, _random2.default)({ name: 'Clyde', type: 'ghost' }), (0, _random2.default)({ name: 'Inky', type: 'ghost' })];
var logger = (0, _loggers2.default)('system');

var create = function create() {
  var environment = _environments2.default.create();
  var map = _maps2.default.create();
  var playersInstances = [];

  logger.info('Adding players...');
  PLAYERS_AI.forEach(function (playerAI, id) {
    var player = _players2.default.create(id, playerAI, environment, map);
    playersInstances.push(player);

    var position = map.getRandomTypedPosition(player);

    logger.info('Adding ' + player.name + ' at pos:', position);

    environment.dispatch((0, _rules.addPlayer)({
      id: id,
      type: player.type,
      pos: (0, _positions.toAbsolutePosition)(position),
      state: 'alive'
    }));
  });
  logger.success('Players added.');

  environment.start(_rules.applyEvent, (0, _rules.stateWillChange)(map));

  logger.info('Starting players...');
  playersInstances.forEach(function (player) {
    return player.start();
  });
  logger.success('Players started.');

  return { map: map, environment: environment };
};

exports.default = { create: create };