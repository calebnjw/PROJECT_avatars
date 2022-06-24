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
      avatar_contents: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [{}, {}, {}],
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
