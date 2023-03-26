const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const phone = Joi.string().max(16);
const birthdate = Joi.date();
const address = Joi.string();
const license = Joi.string();
const specialty = Joi.string();
const email = Joi.string().email();
const userId = Joi.number().integer();

const getDoctorSchema = Joi.object({
  id: id.required(),
});

const createDoctorSchema = Joi.object({
  name: name.required(),
  phone: phone.required(),
  phone: birthdate.required(),
  address: address.required(),
  license: license.required(),
  specialty: specialty,
  user: {
    email: email.required(),
  },
});

const updateDoctorSchema = Joi.object({
  name: name,
  phone: phone,
  phone: birthdate,
  address: address,
  license: license,
  specialty: specialty,
  userId: userId,
});

module.exports = {
  createDoctorSchema,
  updateDoctorSchema,
  getDoctorSchema,
};
