import { ORACLEDB_USER } from '@/const';
import oracledb from 'oracledb';

// https://github.com/oracle/node-oracledb/blob/main/examples/example.js
export const connectOracleDB = async () => {
  try {
    const connection = await oracledb.getConnection({
      user: ORACLEDB_USER,
      password: process.env.ORACLEDB_PASSWORD,
      connectString: process.env.ORACLEDB_CONNECTSTRING,
    });
    return connection;
  } catch (error) {
    console.error('Error connecting to OracleDB:', error);
    throw error;
  }
};
