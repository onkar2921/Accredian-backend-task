CREATE TABLE user (
  id VARCHAR(36) NOT NULL,
  username VARCHAR(25) NOT NULL,
  email VARCHAR(25) NOT NULL,
  password VARCHAR(60) NOT NULL,
  contact BIGINT, 
  address VARCHAR(100),
  PRIMARY KEY (id)
);





-- ///  encrypt at front
-- // const CryptoJS = require('crypto-js');

-- // const dataToEncrypt = 'Sensitive Data';
-- // const secretKey = 'YourSecretKey';

-- // const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
