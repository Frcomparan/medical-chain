const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const phone = Joi.string().max(16);
const birthdate = Joi.date();
const address = Joi.string();
const email = Joi.string().email();
const userId = Joi.number().integer();

const getPacientSchema = Joi.object({
  id: id.required(),
});

const createPacientSchema = Joi.object({
  name: name.required(),
  phone: phone.required(),
  birthdate: birthdate.required(),
  address: address.required(),
  user: Joi.object({
    email: email.required(),
  }).required(),
});

const updatePacientSchema = Joi.object({
  name: name,
  phone: phone,
  phone: birthdate,
  address: address,
  userId: userId,
});

module.exports = {
  createPacientSchema,
  updatePacientSchema,
  getPacientSchema,
};
