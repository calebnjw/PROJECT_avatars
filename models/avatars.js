export default function initAvatarModel(sequelize, DataTypes) {
  return sequelize.define(
    'avatar',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      backgroundId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'avatar_background',
          key: 'id',
        },
      },
      baseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'avatar_base',
          key: 'id',
        },
      },
      faceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'avatar_face',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
    },
  );
}
