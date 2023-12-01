module.exports = {
  roles: ["guest", "manager", "admin"],
  expiredInAccessToken: "2h",
  expiredInRefreshToken: "60d",
  exAccessTokenRedis: 1080000,
  exRefreshTokenRedis: 777600000,
};
