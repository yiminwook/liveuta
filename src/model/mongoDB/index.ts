import { MongoClient } from 'mongodb';

export const mongoDB = new MongoClient(process.env.MONGODB_URI);

export const disconnectMongoDB = () => {
  console.log('Disconnected MongoDB');
  return mongoDB.close();
};

export const connectMongoDB = async (dbName: string, collectionName: string) => {
  try {
    const client = await mongoDB.connect();
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    await disconnectMongoDB();
    throw error;
  }
};
