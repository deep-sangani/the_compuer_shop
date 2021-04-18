'use strict';

const { UUIDV4 } = require("sequelize");

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Users', {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
      },
      name: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: 'customer'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email_id: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};