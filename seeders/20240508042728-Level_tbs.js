'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert("Level_tbs", [
      {
        kode: "1",
        level: "Loket 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kode: "2",
        level: "Loket 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kode: "3",
        level: "Loket 3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kode: "4",
        level: "Loket 4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kode: "5",
        level: "Loket Prioritas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        kode: "ANT",
        level: "Cetak Antrian",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Level_tbs", null, {});
  }
};
