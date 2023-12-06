const createError = require("http-errors");

module.exports = {
  roles: ["guest", "manager", "admin"],
  expiredInAccessToken: "2m",
  expiredInRefreshToken: "10m",
  exAccessTokenCookies: 60,
  exRefreshTokenCookies: 60 * 5,
  httpErrors: {
    objectId: () => createError(400, "Id is not valid"),
    existedFields: (fieldList) => {
      const string = fieldList.join(" or ");
      return createError(400, `${string} already existed.`);
    },
  },
};
