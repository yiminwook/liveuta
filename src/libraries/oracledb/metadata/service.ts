import 'server-only';
import { TMetadata } from '@/types';
import { TUpdateMetadataDto } from '@/types/dto';
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

export const updateMetadataValue = withOracleConnection(
  async (connection, dto: TUpdateMetadataDto) => {
    try {
      const result = await connection.execute(sql.UPDATE_METADATA_VALUE, [dto.value, dto.key]);

      if (result.rowsAffected !== 1) {
        throw new Error('메타데이터 업데이트에 실패했습니다.');
      }

      connection.commit();

      return true;
    } catch (error) {
      connection.rollback();
      throw error;
    }
  },
);
