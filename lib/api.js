import https from 'https';
import fetch from 'node-fetch';
import { getConfig } from './utils.js';

export async function getGoogleAccounts(userId) {
  const NODE_ENV = getConfig('NODE_ENV');
  const httpsAgent = new https.Agent({
    rejectUnauthorized: NODE_ENV !== 'development',
  });
  const USER_API = getConfig('USER_API');
  const USER_API_KEY = getConfig('USER_API_KEY');
  const url = `${USER_API}/google/accounts/${userId}`;

  try {
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'tgb-api-key': USER_API_KEY,
      },
      agent: httpsAgent,
    });

    const json = await response.json();
    console.debug(json);
    return json;
  } catch (e) {
    console.error({
      message: `Failed to fetch Google Accounts for user: ${userId}`,
      error: e.stack || e,
    });
    return Promise.resolve([]);
  }
}

export async function getAPIKeys(userId) {
  const NODE_ENV = getConfig('NODE_ENV');
  const httpsAgent = new https.Agent({
    rejectUnauthorized: NODE_ENV !== 'development',
  });
  const USER_API = getConfig('USER_API');
  const USER_API_KEY = getConfig('USER_API_KEY');
  const url = `${USER_API}/api-keys/${userId}`;

  try {
    const response = await fetch(url, {
      method: 'get',
      headers: {
        'tgb-api-key': USER_API_KEY,
      },
      agent: httpsAgent,
    });

    const json = await response.json();
    console.debug(json);
    return json;
  } catch (e) {
    console.error({
      message: `Failed to fetch User API Keys for user: ${userId}`,
      error: e.stack || e,
    });
    return Promise.resolve({});
  }
}
