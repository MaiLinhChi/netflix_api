const jwt = require("jsonwebtoken");
const createError = require("http-errors");
// const clientRedis = require("../utils/connect_redis");
const RefreshToken = require("../models/RefreshToken");

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

const verifyAndDeleteRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      throw createError.Unauthorized();
    }

    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    const foundRefreshToken = await RefreshToken.findOne({
      userId: user._id,
      token: refreshToken,
    });
    if (!foundRefreshToken) {
      throw createError.Unauthorized();
    }

    await RefreshToken.findByIdAndDelete(foundRefreshToken._id);

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { verifyAccessToken, verifyAndDeleteRefreshToken };
