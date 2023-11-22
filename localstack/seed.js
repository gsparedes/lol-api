import { getMongoDBClientInstance } from '../lib/mongodb.js';
import { getConfig } from '../lib/utils.js';
import champions from './champion.json' assert { type: 'json' };

async function seedData() {
  const client = getMongoDBClientInstance();
  try {
    const collectionName = getConfig('MONGODB_COLLECTION_NAME');
    const database = client.db(getConfig('MONGODB_DBNAME'));
    await database.createCollection(collectionName)
    const collection = database.collection(collectionName);

    const { data } = champions;
    const championNames = Object.keys(data);
    const docs = [];
    championNames.forEach((name) => {
      docs.push(data[name]);
    });

    console.log(`Inserting ${docs.length} champions into DB`);
    const result = await collection.insertMany(docs);

    console.log(`${result.insertedCount} documents were inserted`);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

seedData();
