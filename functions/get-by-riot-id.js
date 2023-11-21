import { wrapLambdaHandler } from '../lib/lambda-handlers.js';
import { lambdaResponse, REQUEST_LAMBDA_HANDLER_OPTIONS } from '../lib/utils.js';
import { initializeEnvironment } from '../lib/initializeEnvironment.js';
import { httpClient } from '../lib/http.js';

// Populate `process.env` with environment variables from AWS Secrets Manager.
await initializeEnvironment();

export const handler = wrapLambdaHandler(async (event) => {
  const { headers: { origin }, queryStringParameters } = event;
  try {
    const { gameName, tagTitle } = queryStringParameters;
    const data = await httpClient({
      method: 'get',
      path: `riot/account/v1/accounts/by-riot-id/${gameName}/${tagTitle}`,
    });

    return lambdaResponse(
      200,
      data,
      { success: true },
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
