const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const {
  expiredInAccessToken,
  expiredInRefreshToken,
  exRefreshTokenRedis,
} = require("../configs");
const clientRedis = require("../utils/connect_redis");

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
  signRtAndSaveRedis: async (user) => {
    const userInfo = {
      _id: user._id,
      role: user.role,
    };
    try {
      const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: expiredInRefreshToken,
      });

      await clientRedis.set(
        user._id.toString(),
        refreshToken,
        "PX",
        exRefreshTokenRedis
      );

      return refreshToken;
    } catch (error) {
      throw createError(500, error);
    }
  },
};
