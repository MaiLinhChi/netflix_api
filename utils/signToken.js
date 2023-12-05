const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const {
  expiredInAccessToken,
  expiredInRefreshToken,
  exRefreshTokenCookies,
} = require("../configs");
const RefreshToken = require("../models/RefreshToken");
// const clientRedis = require("../utils/connect_redis");

module.exports = {
  signAccessToken: (user) => {
    const userInfo = {
      _id: user._id,
      role: user.role,
    };
    return jwt.sign(userInfo, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: expiredInAccessToken,
    });
  },
  signRtAndSaveDb: async (user) => {
    try {
      const refreshToken = jwt.sign(
        {
          _id: user.id,
          role: user.role,
        },
        process.env.REFRESH_TOKEN_KEY,
        {
          expiresIn: expiredInRefreshToken,
        }
      );
      await RefreshToken.create({
        userId: user._id,
        token: refreshToken,
      });

      return refreshToken;
    } catch (error) {
      throw createError(500, error);
    }
  },
};
