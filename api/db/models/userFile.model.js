const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const USER_FILE_TABLE = 'user_files';

const UserFileSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  hash: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  originalSize: {
    field: 'original_size',
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  encryptedSize: {
    field: 'encrypted_size',
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class UserFile extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_FILE_TABLE,
      modelName: 'UserFile',
      timestamps: false,
    };
  }
}

module.exports = { USER_FILE_TABLE, UserFileSchema, UserFile };
