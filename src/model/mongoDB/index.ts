import { MongoClient } from 'mongodb';

export const mongoDB = MongoClient.connect(process.env.MONGODB_URI);

export const connectDB = async (dbName: string, collectionName: string) => {
  try {
    const client = await mongoDB;
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};
