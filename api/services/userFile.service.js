const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UserFileService {
  constructor() {}

  async create(data) {
    try {
      const newUserFile = await models.UserFile.create(data);
      return newUserFile;
    } catch (error) {
      return error;
    }
  }

  async find() {
    const users = await models.UserFile.findAll();
    return users;
  }

  async findByPacient(userId) {
    const users = await models.UserFile.findAll({
      where: { userId },
    });
    return users;
  }
  async findOne(id) {
    const userFile = await models.UserFile.findByPk(id);
    return userFile;
  }
}

module.exports = UserFileService;
