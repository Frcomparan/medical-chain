const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
// const { UserFile } = require('../db/models/userFile.model');

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
    const user = await models.User.findOne({
      where: {
        id: userId,
      },
      include: 'files',
      attributes: {
        exclude: ['privateKey', 'publicKey', 'password'],
      },
    });
    return user;
  }

  async findOne(id) {
    const userFile = await models.UserFile.findByPk(id);
    return userFile;
  }
}

module.exports = UserFileService;
