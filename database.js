const mysql = require("mysql2/promise");
require("dotenv").config();

// Création d'un pool de connexion à la base de données
const pool = mysql.createPool({
  host: process.env.DB_HOST,

  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  waitForConnection: true,
  connectionLimit: parseInt(process.env.CONNECTION_LIMIT, 10),
});

async function executeQuery(sql, params = []) {
  try {
    const [results] = await pool.query(sql, params);
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = { executeQuery };
