const User = require("../models/User");

module.exports = (roles) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (roles.includes(user.role)) {
      next();
    } else {
      return res.status(403).json("You don’t have permission");
    }
  };
};
