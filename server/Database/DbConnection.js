// const mysql = require('mysql2');
// require('dotenv').config();

// const createConnection = async () => {
//   const pool = await mysql.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//   });

//   console.log('Connected to MySQL DB');
//   return pool.promise(); // Ensure that you use .promise() to get the promise-based version
// };

// const pool = createConnection();

// module.exports = pool;


const mysql = require('mysql2/promise');
require('dotenv').config();

const createConnection = async () => {
  const pool = await mysql.createPool({
    // host: process.env.HOST,
    // user: process.env.USER,
    // password: process.env.PASSWORD,
    // database: process.env.DATABASE,
    host: 'localhost',
  user: 'root',
  password: 'onkar2921',
  database: 'interntest'
  });

  console.log('Connected to MySQL DB');
  return pool;
};

const initializePool = async () => {
  const pool = await createConnection();
  console.log("connected to mysql db")
  return pool;
};

module.exports = { initializePool };
