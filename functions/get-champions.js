import { wrapLambdaHandler } from '../lib/lambda-handlers.js';
import { lambdaResponse, REQUEST_LAMBDA_HANDLER_OPTIONS, getConfig } from '../lib/utils.js';
import { initializeEnvironment } from '../lib/initializeEnvironment.js';
import { getMongoDBClientInstance } from '../lib/mongodb.js';
import { get as getCache, set as setCache } from '../lib/redis.js';

// Populate `process.env` with environment variables from AWS Secrets Manager.
await initializeEnvironment();

export const handler = wrapLambdaHandler(async (event) => {
  const { headers: { origin } } = event;
  try {
    const cacheKey = 'champions';
    const cachedData = await getCache(cacheKey);

    if (cachedData) {
      return lambdaResponse(
        200,
        cachedData,
        origin,
      );
    }

    const mongoClient = getMongoDBClientInstance();
    const database = mongoClient.db(getConfig('MONGODB_DBNAME'));
    const collection = database.collection(getConfig('MONGODB_COLLECTION_NAME'));
    const champions = await collection.find().toArray();
    champions.forEach((champion) => {
      // eslint-disable-next-line no-param-reassign
      champion.avatar = `${getConfig('DATA_DRAGON_CDN')}/img/champion/${champion?.image?.full}`;
    });

    await setCache(cacheKey, champions, 10);
    return lambdaResponse(
      200,
      champions,
      origin,
    );
  } catch (e) {
    console.error({
      message: 'Failed to get list of champions',
      error: e.stack || e,
      event,
    });
    return lambdaResponse(
      500,
      {
        message: 'Failed to get list of champions',
        requestId: event?.requestContext?.requestId,
      },
      event.headers.origin,
    );
  }
}, { ...REQUEST_LAMBDA_HANDLER_OPTIONS });

export default handler;
