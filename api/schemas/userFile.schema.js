const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const user = Joi.number().integer();

const createUserFileSchema = Joi.object({
  name: name.required(),
  user: user.required(),
});

const getUserFileSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserFileSchema, getUserFileSchema };
