require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

setTimeout(() => {
  pool.query(
    "CREATE TABLE IF NOT EXISTS users (id UUID PRIMARY KEY, username VARCHAR (256) UNIQUE NOT NULL, hash VARCHAR (1024) NOT NULL, salt VARCHAR (1024) NOT NULL);",
    (err, res) => {
      if (err) {
        console.error("error creating table", err);
      } else {
        console.log("created table successfully");
      }
    }
  );
}, 10000);

module.exports = pool;
