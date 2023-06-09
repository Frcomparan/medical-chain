const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const PACIENT_TABLE = 'pacients';

const PacientSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  birthdate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  typeOfBlood: {
    field: 'type_of_blood',
    allowNull: true,
    type: DataTypes.STRING,
  },
  height: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  weight: {
    allowNull: true,
    type: DataTypes.DECIMAL,
  },
  genre: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Pacient extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });

    this.belongsToMany(models.Doctor, {
      as: 'doctors',
      through: models.PacientPermission,
      foreignKey: 'pacientId',
      otherKey: 'doctorId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PACIENT_TABLE,
      modelName: 'Pacient',
      timestamps: false,
    };
  }
}

module.exports = { PACIENT_TABLE, PacientSchema, Pacient };
