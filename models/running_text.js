'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Running_text extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Running_text.init({
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Running_text',
  });
  return Running_text;
};