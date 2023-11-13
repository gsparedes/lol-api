import { wrapLambdaHandler } from '../lib/lambda-handlers.js';
import { lambdaResponse, REQUEST_LAMBDA_HANDLER_OPTIONS } from '../lib/utils.js';
import { initializeEnvironment } from '../lib/initializeEnvironment.js';

// Populate `process.env` with environment variables from AWS Secrets Manager.
await initializeEnvironment();

export const handler = wrapLambdaHandler(async (event) => {
  const { origin } = event.headers;

  try {
    return lambdaResponse(
      200,
      { success: true },
      origin,
    );
  } catch (e) {
    console.error({
      message: 'Failed to say hello',
      error: e.stack || e,
      event,
    });
    return lambdaResponse(
      500,
      {
        message: 'Failed to say hello',
        requestId: event?.requestContext?.requestId,
      },
      event.headers.origin,
    );
  }
}, { ...REQUEST_LAMBDA_HANDLER_OPTIONS });

export default handler;
