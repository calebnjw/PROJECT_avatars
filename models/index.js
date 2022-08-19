const { Sequelize } = require('sequelize');
const allConfig = require('../config/config');

// import models = require(./model.js
const initUserModel = require('./users');
const initAvatarModel = require('./avatars');
const initAvatarLikesModel = require('./avatarLikes');

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

// adding model definitions to db
// db.Model = initModelModel()
db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Avatar = initAvatarModel(sequelize, Sequelize.DataTypes);
db.AvatarLikes = initAvatarLikesModel(sequelize, Sequelize.DataTypes);

// associations between models
// db.Model.belongsTo(db.Model);
// db.Model.hasMany(db.Model);
// db.Model.belongsToMany(db.Model);
db.Avatar.belongsTo(db.User);
db.User.hasMany(db.Avatar);

db.User.hasMany(db.AvatarLikes);
db.Avatar.hasMany(db.AvatarLikes);
db.AvatarLikes.belongsTo(db.User);
db.AvatarLikes.belongsTo(db.Avatar);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
