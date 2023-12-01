const jwt = require("jsonwebtoken");

const clientRedis = require("../utils/connect_redis");

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, user) => {
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

const verifyRefreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    throw createError.BadRequest();
  }
  try {
    const user = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    const refreshTokenRedis = await clientRedis.get(user._id);
    if (refreshTokenRedis && refreshToken === refreshTokenRedis) {
      return user;
    } else {
      throw createError.Unauthorized();
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json(error.message);
    } else {
      return res.status(500).json(error);
    }
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };
