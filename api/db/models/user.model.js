const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  privateKey: {
    allowNull: false,
    field: 'private_key',
    type: DataTypes.STRING,
  },
  publicKey: {
    allowNull: false,
    field: 'public_key',
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'pacient',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Pacient, {
      as: 'pacient',
      foreignKey: 'userId',
    });

    this.hasOne(models.Doctor, {
      as: 'doctor',
      foreignKey: 'userId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: async (user, options) => {
          const privateKey = await bcrypt.hash(user.privateKey, 10);
          user.privateKey = privateKey;

          const publicKey = await bcrypt.hash(user.publicKey, 10);
          user.publicKey = publicKey;

          const password = await bcrypt.hash(user.password, 10);
          user.password = password;
        },
      },
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
