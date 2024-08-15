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
    return queryInterface.bulkInsert("Displays", [
      {
        loket: "1",
        nomor: 0,
        status: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        loket: "2",
        nomor: 0,
        status: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        loket: "3",
        nomor: 0,
        status: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        loket: "4",
        nomor: 0,
        status: "",
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
    return queryInterface.bulkDelete("Displays", null, {});
  }
};
