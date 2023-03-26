const boom = require('@hapi/boom');
const crypto = require('crypto');
const { models } = require('../libs/sequelize');

function addKeys() {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      'rsa',
      {
        modulusLength: 512,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      },
      (err, publicKey, privateKey) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            privateKey: privateKey,
            publicKey: publicKey,
          });
        }
      }
    );
  });
}

class UserService {
  constructor() {}

  async create(data) {
    const keys = await addKeys();
    data = {
      ...data,
      ...keys,
    };
    const newUser = await models.User.create(data);
    newUser.dataValues = {
      ...newUser.dataValues,
      ...keys,
    };
    return newUser;
  }

  async find() {
    const users = await models.User.findAll();
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
        exclude: ['private-key', 'public-key'],
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
