const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { getKeyPair } = require('../utils/helpers/getKeyPair');

class UserService {
  constructor() {}

  async create(data) {
    const keys = await getKeyPair();
    data = {
      ...data,
      ...keys,
    };
    const newUser = await models.User.create(data);
    newUser.dataValues = {
      ...newUser.dataValues,
      ...keys,
    };
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      attributes: {
        exclude: ['privateKey', 'publicKey', 'password'],
      },
    });
    return users;
  }

  async findByEmail(email) {
    const users = await models.User.findOne({
      where: { email },
    });
    return users;
  }

  async findByPublicKey(key) {
    const users = await models.User.findOne({
      where: { key },
    });
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      attributes: {
        exclude: ['private-key', 'public-key', 'password'],
      },
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
