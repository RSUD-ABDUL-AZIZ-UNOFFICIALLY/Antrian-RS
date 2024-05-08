'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin_tb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin_tb.init({
    user: DataTypes.STRING,
    password: DataTypes.STRING,
    privilege: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin_tb',
  });
  return Admin_tb;
};