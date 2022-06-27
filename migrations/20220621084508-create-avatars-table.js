'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'avatars',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        name: {
          type: Sequelize.STRING,
        },
        avatar_contents: {
          allowNull: false,
          type: Sequelize.ARRAY(Sequelize.JSON),
          defaultValue: [{ "0-0": [0, 0] }, { "0-0": [0, 1] }, { "0-0": [0, 2] }],
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('avatars');
  }
};
