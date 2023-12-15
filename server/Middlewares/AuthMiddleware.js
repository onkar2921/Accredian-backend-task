const jwt = require("jsonwebtoken");
require("dotenv").config();

const AuthMiddleware = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
// console.log('auth',auth)
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - Token missing" });
    }

    const token = auth.split(" ")[1];
    // console.log('auth',token)

    try {
      const tokenData = await jwt.verify(token, process.env.SECREATEKEY);
      // console.log("token data",tokenData)
      req.user = {
        id: tokenData.id,
        email: tokenData.email,
      };
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = AuthMiddleware;
