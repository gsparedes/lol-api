import Redis from 'ioredis';
import { getConfig } from './utils.js';

let redisClient;

function getClientInstance() {
  if (redisClient) {
    return redisClient;
  }
  redisClient = new Redis({
    port: getConfig('CACHE_REDIS_PORT') || '6379',
    host: getConfig('CACHE_REDIS_HOST') || 'localhost',
    username: getConfig('CACHE_REDIS_USER') || 'default',
    password: getConfig('CACHE_REDIS_PASS') || '',
  });
  return redisClient;
}

export async function get(cacheKey) {
  const client = getClientInstance();
  const key = `${getConfig('CACHE_NAMESPACE')}:${cacheKey}`;
  const strObj = await client.get(key);
  if (strObj) {
    const parsedObj = JSON.parse(strObj);
    return parsedObj;
  }
  return null;
}

export async function set(cacheKey, data, ttl) {
  const client = getClientInstance();
  const key = `${getConfig('CACHE_NAMESPACE')}:${cacheKey}`;
  if (ttl) {
    await client.set(key, JSON.stringify(data), 'EX', ttl || getConfig('CACHE_TTL'));
  } else {
    await client.set(key, JSON.stringify(data));
  }
  return true;
}

export default {
  get,
  set,
};
