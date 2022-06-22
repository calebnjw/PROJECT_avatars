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
        background_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'avatar_background',
            key: 'id',
          },
        },
        base_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'avatar_base',
            key: 'id',
          },
        },
        face_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'avatar_face',
            key: 'id',
          },
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
