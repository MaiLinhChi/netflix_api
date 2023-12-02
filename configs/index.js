const createError = require("http-errors");

module.exports = {
  roles: ["guest", "manager", "admin"],
  expiredInAccessToken: "3h",
  expiredInRefreshToken: "30d",
  exAccessTokenCookies: 10800000,
  exRefreshTokenCookies: 2592000000,
  httpErrors: {
    objectId: () => createError(400, "Id is not valid"),
    existedFields: (fieldList) => {
      const string = fieldList.join(" or ");
      return createError(400, `${string} already existed.`);
    },
  },
};
