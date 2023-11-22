import { wrapLambdaHandler } from '../lib/lambda-handlers.js';
import { lambdaResponse, REQUEST_LAMBDA_HANDLER_OPTIONS } from '../lib/utils.js';
import { initializeEnvironment } from '../lib/initializeEnvironment.js';
import { httpClient } from '../lib/http.js';
import { get as getCache, set as setCache } from '../lib/redis.js';

// Populate `process.env` with environment variables from AWS Secrets Manager.
await initializeEnvironment();

export const handler = wrapLambdaHandler(async (event) => {
  const { headers: { origin }, queryStringParameters } = event;
  try {
    const { gameName, tagTitle, region } = queryStringParameters;
    const cacheKey = `${region}:${gameName}:${tagTitle}`;
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      return lambdaResponse(
        200,
        cachedData,
        origin,
      );
    }

    const data = await httpClient({
      region,
      method: 'get',
      path: `riot/account/v1/accounts/by-riot-id/${gameName}/${tagTitle}`,
    });

    await setCache(cacheKey, data, 10);
    return lambdaResponse(
      200,
      data,
      origin,
    );
  } catch (e) {
    console.error({
      message: 'Failed to find summoner by riot id',
      error: e.stack || e,
      event,
    });
    return lambdaResponse(
      500,
      {
        message: 'Failed to find summoner by riot id',
        requestId: event?.requestContext?.requestId,
      },
      event.headers.origin,
    );
  }
}, { ...REQUEST_LAMBDA_HANDLER_OPTIONS });

export default handler;
