import { MongoClient } from 'mongodb';

export const mongoDB = new MongoClient(process.env.MONGODB_URI);

export const connectMongoDB = async (dbName: string, collectionName: string) => {
  const client = await mongoDB.connect();
  return client.db(dbName).collection(collectionName);
};
