'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Antrian_loket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Antrian_loket.init({
    nomor_antri: DataTypes.STRING,
    loket: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Antrian_loket',
  });
  return Antrian_loket;
};