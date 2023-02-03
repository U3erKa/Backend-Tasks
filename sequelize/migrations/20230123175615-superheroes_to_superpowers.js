'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('superheroes_to_superpowers', {
      heroId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'hero_id',
        references: {
          key: 'id',
          model: 'super_heroes',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      powerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'power_id',
        references: {
          key: 'id',
          model: 'super_powers',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('superheroes_to_superpowers');
  },
};
