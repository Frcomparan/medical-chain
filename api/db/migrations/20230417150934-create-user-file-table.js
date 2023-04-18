'use strict';

const { DataTypes } = require('sequelize');
const { USER_FILE_TABLE } = require('../models/userFile.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_FILE_TABLE, {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_FILE_TABLE);
  },
};
