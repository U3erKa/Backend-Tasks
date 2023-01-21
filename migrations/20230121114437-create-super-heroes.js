'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('super_heroes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      realName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'real_name',
      },
      originDescription: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'origin_description',
      },
      catchPhrase: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'catch_phrase',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('super_heroes');
  },
};
