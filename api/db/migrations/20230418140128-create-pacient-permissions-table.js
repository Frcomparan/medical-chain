'use strict';

const { DataTypes } = require('sequelize');
const {
  PACIENTE_PERMISSION_TABLE,
} = require('../models/pacientPermission.model');
const { DOCTOR_TABLE } = require('../models/doctor.model');
const { PACIENT_TABLE } = require('../models/pacient.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(PACIENTE_PERMISSION_TABLE, {
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
        references: {
          model: PACIENT_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      doctorId: {
        allowNull: false,
        field: 'doctor_id',
        type: DataTypes.INTEGER,
        references: {
          model: DOCTOR_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(PACIENTE_PERMISSION_TABLE);
  },
};
