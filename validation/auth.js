const Joi = require("joi");

const register = Joi.object({
  name: Joi.string().min(2).required(),
  phone: Joi.string().min(7).max(11).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30),
});

module.exports = {
  register,
  login,
};
