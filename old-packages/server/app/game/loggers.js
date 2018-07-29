const level = process.env.LOG_LEVEL || 'error';
const info = scope => (...args) => console.log('info', scope, ...args);
const error = scope => (...args) => console.error('error', scope, ...args);
const success = scope => (...args) => console.log('success', scope, ...args);

export default scope => ({
  info: level === 'info' ? info(scope) : () => {},
  error: error(scope),
  success: level === 'info' ? success(scope) : () => {},
});
