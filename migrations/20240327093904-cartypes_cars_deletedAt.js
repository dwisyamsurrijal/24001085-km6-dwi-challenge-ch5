'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("cartypes", "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE,
    });
    // add deletedAt column in cars table
    await queryInterface.addColumn("cars", "deletedAt", {
      allowNull: true,
      type: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    /*
     */
    await queryInterface.removeColumn("cartypes", "deletedAt");
    await queryInterface.removeColumn("cars", "deletedAt");
  }
};
