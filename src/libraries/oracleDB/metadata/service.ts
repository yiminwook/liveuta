import { METADATA } from '@/types';
import { connectOracleDB } from '../connection';
import * as sql from './sql';

export type MetadataRow = [
  number, //id
  string, //key
  string, //value
];

export async function getAllMetadata() {
  const connection = await connectOracleDB();
  try {
    const result = await connection.execute<MetadataRow>(sql.GET_ALL_METADATA);

    await connection.close();

    const metadata = result.rows?.reduce<Record<string, string>>((acc, [_id, key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    return metadata as METADATA;
  } catch (error) {
    await connection.close();
    throw error;
  }
}
