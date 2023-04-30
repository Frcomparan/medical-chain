const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class PacientPermissionService {
  constructor() {}

  async create(data, doctorId) {
    const user = await models.User.findByPk(doctorId, {
      include: ['doctor'],
    });
    const doctor = user.doctor;
    const newPermission = await models.PacientPermission.create({
      ...data,
      doctorId: doctor.id,
    });

    return newPermission;
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

  async findOne(id) {
    const permission = await models.PacientPermission.findByPk(id);
    if (!permission) {
      throw boom.notFound('permission not found');
    }

    return permission;
  }

  async findByPacientAndDoctor(userPacientId, userDoctorId) {
    // console.log(userDoctorId);

    const userDoctor = await models.User.findByPk(userDoctorId, {
      include: ['doctor'],
    });

    const userPacient = await models.User.findByPk(userPacientId, {
      include: ['pacient'],
    });

    if (!userPacient.pacient) {
      throw boom.notFound('pacient not found');
    }

    const doctorId = userDoctor.doctor.id;
    const pacientId = userPacient.pacient.id;
    const permission = await models.PacientPermission.findOne({
      where: {
        pacientId,
        doctorId,
      },
    });

    if (!permission) {
      throw boom.forbidden('without permission for this pacient');
    }

    return permission;
  }

  async togglePermission(id) {
    const permission = this.findOne(id);

    const rta = await permission.update({
      active: !permission.active,
    });
    return rta;
  }
}

module.exports = PacientPermissionService;
