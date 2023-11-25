const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(403).json("Token is not valid!!!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(400).json("You are not authenticated!!!");
  }
};

module.exports = verifyToken;
