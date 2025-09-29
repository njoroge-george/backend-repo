'use strict';

/** @type {import('sequelize-cli').Migration} */
// migrations/add-name-to-user.js
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("user", "name", {
    type: Sequelize.STRING,
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("user", "name");
}
