import {
  authenticateRequest, lambdaResponse,
} from './utils.js';

export default (handler) => async (event) => {
  const { origin } = event.headers;
  // Validate authentication header
  const authenticated = authenticateRequest(event.headers);
  if (!authenticated) {
    return lambdaResponse(401, {}, origin);
  }
  return handler(event);
};
