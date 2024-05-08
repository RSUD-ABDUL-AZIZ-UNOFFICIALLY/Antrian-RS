'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Antrian_loket_prioritas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Antrian_loket_prioritas.init({
    nomor_antri: DataTypes.STRING,
    loket: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Antrian_loket_prioritas',
  });
  return Antrian_loket_prioritas;
};