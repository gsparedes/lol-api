import { isString } from 'lodash-es';

export function lambdaResponse(statusCode, body, origin, addHeaders = {}) {
  const originsStr = getConfig('CORS_ALLOW_ORIGIN') || '';
  const originsArr = originsStr.split(',');

  let headers;

  if (originsArr.includes(origin)) {
    headers = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    };
  }

  return {
    statusCode,
    body: isString(body) ? body : JSON.stringify(body),
    headers: { ...headers, ...addHeaders },
  };
}

/**
 * Returns config based environment variables.
 * Use this instead of `process.env.*`.
 * This helps prevent undefined variables that
 * can happen in Lambdas that need to fetch
 * configuration params at runtime and ensure values are fresh.
 * @param {String} property
 * @returns {string|null}
 */
export function getConfig(property) {
  if (process.env[property]) {
    return process.env[property];
  }

  return null;
}

export function authenticateRequest(headers) {
  const secretAuthHeaderValue = getConfig('LAMBDA_AUTH_HEADER_VALUE') || '';
  const authHeader = getConfig('LAMBDA_AUTH_HEADER') || 'api-lambda-auth';
  const authHeaderValue = headers[authHeader];

  if (authHeaderValue && authHeaderValue === secretAuthHeaderValue) {
    return true;
  }

  return false;
}

export const lambdaStageMap = {
  development: 'development',
  stage: 'stage',
  production: 'prod',
};

export const REQUEST_LAMBDA_HANDLER_OPTIONS = {
  auth: {
    requestAuth: getConfig('IS_LOCAL') === 'false',
  },
};

export default {
  lambdaResponse,
  getConfig,
  authenticateRequest,
  lambdaStageMap,
  REQUEST_LAMBDA_HANDLER_OPTIONS,
};
