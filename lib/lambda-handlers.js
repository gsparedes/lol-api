import requestAuthMiddleware from './auth.js';

const wrapLambdaHandler = (handler, { auth } = {}) => {
  let resHandler = handler;
  if (auth?.requestAuth) {
    resHandler = requestAuthMiddleware(handler);
  }
  return resHandler;
};

export { wrapLambdaHandler };

export default { wrapLambdaHandler };
