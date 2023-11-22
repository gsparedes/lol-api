import { wrapLambdaHandler } from '../lib/lambda-handlers.js';
import { lambdaResponse, REQUEST_LAMBDA_HANDLER_OPTIONS, getConfig } from '../lib/utils.js';
import { initializeEnvironment } from '../lib/initializeEnvironment.js';
import { httpClient } from '../lib/http.js';
import { getMongoDBClientInstance } from '../lib/mongodb.js';
import { get as getCache, set as setCache } from '../lib/redis.js';

// Populate `process.env` with environment variables from AWS Secrets Manager.
await initializeEnvironment();

export const handler = wrapLambdaHandler(async (event) => {
  const { headers: { origin }, queryStringParameters } = event;
  try {
    const { pUUID, region } = queryStringParameters;
    const cacheKey = `${region}:${pUUID}:champions`;
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
      path: `lol/champion-mastery/v4/champion-masteries/by-puuid/${pUUID}`,
    });

    const championIDs = data.map((champion) => String(champion.championId));
    const mongoClient = getMongoDBClientInstance();
    const database = mongoClient.db(getConfig('MONGODB_DBNAME'));
    const collection = database.collection(getConfig('MONGODB_COLLECTION_NAME'));
    const champions = await collection.find({ key: { $in: championIDs } }).toArray();

    await setCache(cacheKey, champions, 10);
    return lambdaResponse(
      200,
      champions,
      origin,
    );
  } catch (e) {
    console.error({
      message: 'Failed to get summoner list of champions',
      error: e.stack || e,
      event,
    });
    return lambdaResponse(
      500,
      {
        message: 'Failed to get summoner list of champions',
        requestId: event?.requestContext?.requestId,
      },
      event.headers.origin,
    );
  }
}, { ...REQUEST_LAMBDA_HANDLER_OPTIONS });

export default handler;
