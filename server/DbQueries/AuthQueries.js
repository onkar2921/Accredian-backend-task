// const pool=require("../Database/DbConnection");
const { initializePool } = require('../Database/DbConnection');


// sign up query
const signUpQuery = async (userData) => {
  const pool = await initializePool();
    // Insert dynamic data into the table
    const results = await pool.query(
      `INSERT INTO user (id, username, email, password, contact, address) VALUES (?, ?, ?, ?, ?, ?)`,
      [userData.id, userData.username, userData.email, userData.password, userData.contact, userData.address]
    );

    console.log('Insertion successful. Affected rows:', results.affectedRows);
    return results;
    
    
  };
  
  // get user data query
  const getUserdataQuery = async (userId) => {
    const pool = await initializePool();
   const result=await pool.query(`SELECT * FROM user WHERE id = ?`, [userId])
    // console.log('Query results:', result);
      return result;
  
  };
  
  // check user already exist or not
  const checkUser = async (email) => {
    const pool = await initializePool();
    const result = await pool.query('SELECT id, email, password FROM user WHERE email = ?', [email]);

      // console.log('Query results:', result);
      return result;
    
  };
  
  module.exports = { signUpQuery, getUserdataQuery, checkUser };
  