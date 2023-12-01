const createError = require("http-errors");

module.exports = {
  roles: ["guest", "manager", "admin"],
  expiredInAccessToken: "2h",
  expiredInRefreshToken: "20d",
  exAccessTokenCookies: 1080000,
  exRefreshTokenCookies: 777600000,
  httpErrors: {
    objectId: () => createError(400, "Id is not valid"),
    existedFields: (fieldList) => {
      const string = fieldList.join(" or ");
      return createError(400, `${string} already existed.`);
    },
  },
};
