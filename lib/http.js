import fetch from 'node-fetch';
import { getConfig } from './utils.js';

export const httpClient = async ({
  region,
  method,
  path,
  queryParams,
}) => {
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

  if (!response.ok) {
    throw new Error(`Failure to query Lol API: ${response.status} - ${response.statusText}`);
  }

  const json = await response.json();
  return Promise.resolve(json);
};

export default { httpClient };
