const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserService = require('./user.service');
const { config } = require('../config/config');
const jwtConfig = {
  expiresIn: '7d',
};

const service = new UserService();

class AuthService {
  async getUser(email, privateKey) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(privateKey, user.privateKey);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.privateKey;
    delete user.dataValues.publicKey;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, config.jwtSecret, jwtConfig);

    return {
      user,
      token,
    };
  }
}

module.exports = AuthService;
