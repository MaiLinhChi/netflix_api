const Joi = require("joi");

const getCommemtOfMovie = Joi.object({
  movieId: Joi.string().required(),
});

const create = Joi.object({
  comment: Joi.string().required(),
  userId: Joi.string().required(),
  movieId: Joi.string().required(),
});

const update = Joi.object({
  id: Joi.string().required(),
  comment: Joi.string().optional(),
});

module.exports = {
  getCommemtOfMovie,
  create,
  update,
};
