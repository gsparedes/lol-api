import { wrapLambdaHandler } from '../lib/lambda-handlers.js';
import { lambdaResponse, REQUEST_LAMBDA_HANDLER_OPTIONS, getConfig } from '../lib/utils.js';
import { initializeEnvironment } from '../lib/initializeEnvironment.js';
import { httpClient } from '../lib/http.js';
import { get as getCache, set as setCache } from '../lib/redis.js';

// Populate `process.env` with environment variables from AWS Secrets Manager.
await initializeEnvironment();

export const handler = wrapLambdaHandler(async (event) => {
  const { headers: { origin }, queryStringParameters } = event;
  try {
    const { pUUID, region } = queryStringParameters;
    const cacheKey = `${region}:${pUUID}:details`;
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
      path: `lol/summoner/v4/summoners/by-puuid/${pUUID}`,
    });

    const details = {
      ...data,
      profileImage: `${getConfig('DATA_DRAGON_CDN')}/img/profileicon/${data.profileIconId}.png`,
    };

    await setCache(cacheKey, details, 10);
    return lambdaResponse(
      200,
      details,
      origin,
    );
  } catch (e) {
    console.error({
      message: 'Failed to get summoner details',
      error: e.stack || e,
      event,
    });
    return lambdaResponse(
      500,
      {
        message: 'Failed to get summoner details',
        requestId: event?.requestContext?.requestId,
      },
      event.headers.origin,
    );
  }
}, { ...REQUEST_LAMBDA_HANDLER_OPTIONS });

export default handler;
