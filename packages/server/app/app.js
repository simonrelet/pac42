import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import apiRoutes from './apiRoutes';
import staticRoutes from './staticRoutes';

let apiDelay = 0;
if (process.env.DEVELOPMENT) {
  apiDelay = parseInt(process.env.API_DELAY || 2000, 10);
  console.log('RUNNING IN DEVELOPMENT MODE.');
  console.log(`All API requestes are delayed of ${apiDelay} millisecond.`);
}

const handleDelay = (req, res, next) => {
  if (apiDelay) {
    setTimeout(next, apiDelay);
  } else {
    next();
  }
};

// catch 404 and forward to error handler
const handle404 = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

// the 4 parameters are required so express recognize the callback as an error
// handler
const handleError = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.DEVELOPMENT ? err : {};
  console.error(err);
  res.sendStatus(err.status || 500);
};

const app = express();

app.use(logger(process.env.DEVELOPMENT ? 'dev' : 'combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', handleDelay, apiRoutes);
app.use('/', staticRoutes);
app.use(handle404);
app.use(handleError);

export default app;
