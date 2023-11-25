const Joi = require("joi");

const random = Joi.object({
  type: Joi.string().min(2).optional(),
});

const search = Joi.object({
  q: Joi.string().min(1).optional(),
});

const suggest = Joi.object({
  type: Joi.string().min(1).optional(),
  genre: Joi.string().min(1).optional(),
});

const create = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  imageTitle: Joi.string().required(),
  imageSmall: Joi.string().required(),
  trailer: Joi.string().required(),
  video: Joi.string().required(),
  duration: Joi.string().required(),
  limit: Joi.number().required(),
  genre: Joi.array().items(Joi.string()).required(),
  starring: Joi.array().items(Joi.string()).required(),
  year: Joi.number().required(),
  country: Joi.string().required(),
  type: Joi.string().required(),
});

const update = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().min(1).optional(),
  description: Joi.string().optional(),
  image: Joi.string().optional(),
  imageTitle: Joi.string().optional(),
  imageSmall: Joi.string().optional(),
  trailer: Joi.string().optional(),
  video: Joi.string().optional(),
  duration: Joi.string().optional(),
  limit: Joi.number().optional(),
  genre: Joi.array().items(Joi.string()).optional(),
  starring: Joi.array().items(Joi.string()).optional(),
  year: Joi.number().optional(),
  country: Joi.string().optional(),
  type: Joi.string().optional(),
});

module.exports = {
  random,
  search,
  suggest,
  create,
  update,
};
