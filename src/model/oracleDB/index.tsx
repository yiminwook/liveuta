import oracledb from 'oracledb';

export const connectDB = async () => {
  try {
    const connetion = await oracledb.getConnection({
      user: process.env.ORACLEDB_USER,
      password: process.env.ORACLEDB_PASSWORD,
      connectString: process.env.ORACLEDB_CONNECTSTRING,
    });
    return connetion;
  } catch (error) {
    console.error('Error connecting to OracleDB:', error);
    throw error;
  }
};
