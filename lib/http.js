import fetch from 'node-fetch';
import { getConfig } from './utils.js';

export const httpClient = async ({
  region,
  method,
  path,
  queryParams,
}) => {
  try {
    const endpoint = getConfig('LOL_API_ENDPOINT');
    const apiKey = getConfig('LOL_API_KEY');
    const queryParamsStr = new URLSearchParams({
      ...queryParams,
    }).toString();
    const url = `https://${region}.${endpoint}/${path}${queryParamsStr ? `?${queryParamsStr}` : ''}`;

    const response = await fetch(url, {
      headers: {
        'X-Riot-Token': apiKey,
      },
      method,
    });

    const json = await response.json();
    return Promise.resolve(json);
  } catch (error) {
    console.error({
      message: 'Failed to query LoL API',
      error: error.stack || error,
    });
    return error;
  }
};

export default { httpClient };
