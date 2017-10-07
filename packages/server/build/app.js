'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apiRoutes = require('./apiRoutes');

var _apiRoutes2 = _interopRequireDefault(_apiRoutes);

var _staticRoutes = require('./staticRoutes');

var _staticRoutes2 = _interopRequireDefault(_staticRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiDelay = 0;
if (process.env.DEVELOPMENT) {
  apiDelay = parseInt(process.env.API_DELAY || 2000, 10);
  console.log('RUNNING IN DEVELOPMENT MODE.');
  console.log('All API requestes are delayed of ' + apiDelay + ' millisecond.');
}

var handleDelay = function handleDelay(req, res, next) {
  if (apiDelay) {
    setTimeout(next, apiDelay);
  } else {
    next();
  }
};

// catch 404 and forward to error handler
var handle404 = function handle404(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
};

// the 4 parameters are required so express recognize the callback as an error
// handler
var handleError = function handleError(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.DEVELOPMENT ? err : {};
  console.error(err);
  res.sendStatus(err.status || 500);
};

var app = (0, _express2.default)();

app.use((0, _morgan2.default)(process.env.DEVELOPMENT ? 'dev' : 'combined'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use('/api', handleDelay, _apiRoutes2.default);
app.use('/', _staticRoutes2.default);
app.use(handle404);
app.use(handleError);

exports.default = app;