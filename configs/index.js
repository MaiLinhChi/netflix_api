const createError = require("http-errors");

module.exports = {
  roles: ["guest", "manager", "admin"],
  expiredInAccessToken: "3h",
  expiredInRefreshToken: "30d",
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
