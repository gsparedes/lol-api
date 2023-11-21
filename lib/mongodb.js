import { MongoClient } from 'mongodb';
import { getConfig } from './utils.js';

// Initialize once and preserve between Lambda executions.
let mongoClient;

export function getMongoDBClientInstance() {
  if (mongoClient) {
    return mongoClient;
  }
  const uri = getConfig('MONGODB_URI');
  mongoClient = new MongoClient(uri);
  return mongoClient;
}

export default {
  getClientInstance: getMongoDBClientInstance,
};
