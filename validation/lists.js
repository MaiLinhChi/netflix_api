const Joi = require("joi");

const getAll = Joi.object({
  type: Joi.string().optional(),
  genre: Joi.string().optional(),
});

const create = Joi.object({
  title: Joi.string().required(),
  type: Joi.string().required(),
  genre: Joi.array().items(Joi.string()).min(1).required(),
  idMovies: Joi.array().items(Joi.string()).min(1).required(),
});

const update = Joi.object({
  id: Joi.string().optional(),
  title: Joi.string().optional(),
  type: Joi.string().optional(),
  genre: Joi.array().items(Joi.string()).min(1).optional(),
  idMovies: Joi.array().items(Joi.string()).min(1).optional(),
  updatedAt: Joi.string().required(),
});

module.exports = {
  getAll,
  create,
  update,
};
