const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(11).required(),
  job: Joi.string().min(3).max(15).required(),
  address: Joi.string().min(3).required(),
  profilePicture: Joi.string().optional(),
  role: Joi.string().valid("guest", "manager", "admin").optional(),
  password: Joi.string().min(6).max(30).required(),
});

const update = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().min(7).max(11).optional(),
  job: Joi.string().min(3).max(15).optional(),
  address: Joi.string().min(3).optional(),
  profilePicture: Joi.string().optional(),
  role: Joi.string().valid("guest", "manager", "admin").optional(),
  updatedAt: Joi.string().required(),
  password: Joi.string().min(6).max(30).optional(),
});

module.exports = {
  create,
  update,
};
