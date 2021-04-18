'use strict';
import {
  Model,
  Sequelize
} from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  User.init({
    user_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
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
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return User;
};