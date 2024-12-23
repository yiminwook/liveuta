import { TMetadata } from '@/types';
import { withOracleConnection } from '../connection';
import * as sql from './sql';

export type MetadataRow = [
  number, //id
  string, //key
  string, //value
];

export const getAllMetadata = withOracleConnection(async (connection) => {
  const result = await connection.execute<MetadataRow>(sql.GET_ALL_METADATA);

  const metadata = result.rows?.reduce<Record<string, string>>((acc, [_id, key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  return metadata as TMetadata;
});
