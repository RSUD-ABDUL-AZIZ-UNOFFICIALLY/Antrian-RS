'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Antrian_loket_prioritas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomor_antri: {
        type: Sequelize.INTEGER
      },
      loket: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('Antrian_loket_prioritas', ['nomor_antri', 'createdAt'], {
      unique: true,
      name: 'unique_nomor_antri_createdAt' // Nama indeks unik
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Antrian_loket_prioritas');
  }
};