const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { getKeyPair } = require('../utils/helpers/getKeyPair');

class DoctorService {
  constructor() {}

  async create(data) {
    const keys = await getKeyPair();
    console.log(data);
    data = {
      ...data,
      user: {
        ...data.user,
        ...keys,
        role: 'doctor',
      },
    };
    console.log(data);

    const newDoctor = await models.Doctor.create(data, {
      include: ['user'],
    });
    newDoctor.dataValues.user.dataValues = {
      ...newDoctor.dataValues.user.dataValues,
      ...keys,
    };

    return newDoctor;
  }

  async find() {
    const doctor = await models.Doctor.findAll();
    return doctor;
  }

  async findOne(id) {
    const doctor = await models.Doctor.findByPk(id);
    if (!doctor) {
      throw boom.notFound('doctor not found');
    }
    return doctor;
  }

  async update(id, changes) {
    const doctor = await this.findOne(id);
    const rta = await doctor.update(changes);
    return rta;
  }
}

module.exports = DoctorService;
