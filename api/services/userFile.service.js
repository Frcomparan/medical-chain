const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UserFileService {
  constructor() {}

  async create(data) {
    const newUserFile = await models.UserFile.create(data);
    return newUserFile;
  }

  async find() {
    const users = await models.UserFile.findAll();
    return users;
  }

  async findOne(id) {
    const userFile = await models.User.findByPk(id);
    return userFile;
  }
}

module.exports = UserFileService;
