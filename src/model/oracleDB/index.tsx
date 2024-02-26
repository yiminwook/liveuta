import oracledb from 'oracledb';

export const connectOracleDB = async () => {
  let connection: null | oracledb.Connection = null;
  try {
    connection = await oracledb.getConnection({
      user: process.env.ORACLEDB_USER,
      password: process.env.ORACLEDB_PASSWORD,
      connectString: process.env.ORACLEDB_CONNECTSTRING,
    });
    console.log('Connected OracleDB');
    return connection;
  } catch (error) {
    console.error('Error connecting to OracleDB:', error);
    if (connection) await connection.close();
    throw error;
  }
};
