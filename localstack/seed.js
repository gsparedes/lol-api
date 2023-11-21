import { getMongoDBClientInstance } from '../lib/mongodb.js';
import { getConfig } from '../lib/utils.js';
import champions from './champion.json' assert { type: 'json' };

async function seedData() {
  const client = getMongoDBClientInstance();
  try {
    const database = client.db(getConfig('MONGODB_DBNAME'));
    const collection = database.collection('champions');

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
