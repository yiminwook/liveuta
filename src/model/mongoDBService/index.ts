import { MongoClient, Collection, Document, Filter } from 'mongodb';

const uri: string = process.env.MONGODB_URI || '';

const connectToDatabase = async (dbName: string, collectionName: string): Promise<Collection> => {
  try {
    const client = await MongoClient.connect(uri);
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export const readDB = async (
  collectionName: string,
  dbName: string,
  options: { filter?: any; projection?: any; sort?: any } = {
    filter: {},
    projection: {},
    sort: {},
  },
) => {
  try {
    const collection = await connectToDatabase(dbName, collectionName);
    const result = await collection
      .find(options.filter)
      .sort(options.sort)
      .project(options.projection)
      .toArray();
    return result;
  } catch (error) {
    console.error('Error reading from MongoDB:', error);
    throw error;
  }
};

export const writeDB = async (
  collectionName: string,
  dbName: string,
  options?: { document?: any },
) => {
  try {
    const collection = await connectToDatabase(dbName, collectionName);
    const result = await collection.insertOne(options?.document);
    return result;
  } catch (error) {
    console.error('Error writing to MongoDB:', error);
    throw error;
  }
};

export const deleteDB = async (
  collectionName: string,
  dbName: string,
  document: Filter<Document>,
) => {
  try {
    const collection = await connectToDatabase(dbName, collectionName);
    console.log('deleted document', document);
    const result = await collection.deleteOne(document);
    return result;
  } catch (error) {
    console.error('Error deleting from MongoDB:', error);
    throw error;
  }
};
