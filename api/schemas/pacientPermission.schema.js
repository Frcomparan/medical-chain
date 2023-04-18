const Joi = require('joi');

const id = Joi.number().integer();
const doctorId = Joi.number().integer();
const pacientId = Joi.number().integer();
const active = Joi.boolean();

const getPacientPermissionSchema = Joi.object({
  id: id.required(),
});

const createPacientPermissionSchema = Joi.object({
  pacientId: pacientId.required(),
});

const updatePacientPermissionSchema = Joi.object({
  active,
});

module.exports = {
  getPacientPermissionSchema,
  updatePacientPermissionSchema,
  createPacientPermissionSchema,
};
