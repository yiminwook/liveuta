import { Data, Effect } from 'effect';
import { Document, MongoClient } from 'mongodb';

class MongoDBError extends Data.TaggedError('MongoDBError')<{
  message?: string;
  cause?: unknown;
}> {}

export const mongoDB = new MongoClient(process.env.MONGODB_URI, { maxPoolSize: 100 });

export const connectMongoDB = async <T extends Document>(
  dbName: string,
  collectionName: string,
) => {
  const client = await mongoDB.connect();
  return client.db(dbName).collection<T>(collectionName);
};

export const mongoDBEffect = Effect.tryPromise({
  try: () => mongoDB.connect(),
  catch: (error) =>
    new MongoDBError({ message: 'Failed to connect to MongoDB Client', cause: error }),
});
