const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { getKeyPair } = require('../utils/helpers/getKeyPair');

class PacientService {
  constructor() {}

  async create(data, creator) {
    const keys = await getKeyPair();
    console.log(data);
    data = {
      ...data,
      user: {
        ...data.user,
        ...keys,
      },
    };
    console.log(data);

    const newPacient = await models.Pacient.create(data, {
      include: ['user'],
    });

    newPacient.dataValues.user.dataValues = {
      ...newPacient.dataValues.user.dataValues,
      ...keys,
    };
    delete newPacient.dataValues.user.dataValues.password;

    if (creator) {
      const newPermission = await models.PacientPermission.create({
        doctorId: creator,
        pacientId: newPacient.id,
      });

      console.log(newPermission);
    }

    return newPacient;
  }

  async find() {
    const pacient = await models.Pacient.findAll();
    return pacient;
  }

  async findOne(id) {
    const pacient = await models.Pacient.findByPk(id);
    if (!pacient) {
      throw boom.notFound('pacient not found');
    }
    return pacient;
  }

  async findPermissions(id) {
    const user = await models.User.findByPk(id, {
      include: ['pacient'],
    });
    const pacient = user.pacient;
    let pacientPermissions;
    if (pacient) {
      pacientPermissions = await models.PacientPermission.findAll({
        where: { pacientId: pacient.id },
      });
    }
    if (!pacient) {
      throw boom.notFound('pacient not found');
    }
    return pacientPermissions;
  }

  async update(id, changes) {
    const pacient = await this.findOne(id);
    const rta = await pacient.update(changes);
    return rta;
  }

  async delete(id) {
    const pacient = await this.findOne(id);
    await pacient.destroy();
    return { id };
  }
}

module.exports = PacientService;
