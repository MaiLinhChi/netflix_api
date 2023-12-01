const User = require("../models/User");

module.exports = (roles) => {
  return async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json("You don’t have permission");
    }
  };
};
