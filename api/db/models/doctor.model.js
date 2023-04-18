const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const DOCTOR_TABLE = 'doctors';

const DoctorSchema = {
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
  license: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  specialty: {
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

class Doctor extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });

    this.belongsToMany(models.Pacient, {
      as: 'pacients',
      through: models.PacientPermission,
      foreignKey: 'doctorId',
      otherKey: 'pacientId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DOCTOR_TABLE,
      modelName: 'Doctor',
      timestamps: false,
    };
  }
}

module.exports = { DOCTOR_TABLE, DoctorSchema, Doctor };
