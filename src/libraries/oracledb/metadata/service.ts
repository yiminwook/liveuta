import 'server-only';
import { TMetadata } from '@/types';
import { TUpdateMetadataDto } from '@/types/dto';
import { withOracleConnection } from '../connection';
import * as sql from './sql';

export type MetadataRow = [
  string, //key
  string, //value
];

export const getAllPulbicMetadata = withOracleConnection(async (connection) => {
  const result = await connection.execute<MetadataRow>(sql.GET_ALL_METADATA);

  const metadata = result.rows?.reduce<Record<string, string>>((acc, [key, value]) => {
    if (key === 'google_refresh_token') {
      // 민감한 정보는 제외
      return acc;
    }
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

export const getMetadataByKey = withOracleConnection(async (connection, dto: { key: string }) => {
  const result = await connection.execute<MetadataRow>(sql.GET_METADATA_BY_KEY, {
    key: dto.key,
  });
  const token = result.rows?.[0]?.[0];

  if (!token) {
    throw new Error('google refresh token is not provided');
  }

  return token;
});
