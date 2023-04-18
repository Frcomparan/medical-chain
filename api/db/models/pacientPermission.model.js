const { Model, DataTypes, Sequelize } = require('sequelize');

const PACIENTE_PERMISSION_TABLE = 'pacient_permissions';

const PacientPermissionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  pacientId: {
    allowNull: false,
    field: 'pacient_id',
    type: DataTypes.INTEGER,
  },
  doctorId: {
    allowNull: false,
    field: 'doctor_id',
    type: DataTypes.INTEGER,
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class PacientPermission extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: PACIENTE_PERMISSION_TABLE,
      modelName: 'PacientPermission',
      timestamps: false,
    };
  }
}

module.exports = {
  PACIENTE_PERMISSION_TABLE,
  PacientPermissionSchema,
  PacientPermission,
};
