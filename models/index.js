const { Sequelize } = require('sequelize');
const allConfig = require('../config/config.js');

// import models = require(./model.js
const initUserModel = require('./users.js');
const initAvatarModel = require('./avatars.js');

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

// associations between models
// db.Model.belongsTo(db.Model);
// db.Model.hasMany(db.Model);
// db.Model.belongsToMany(db.Model);
db.Avatar.belongsTo(db.User);
db.User.hasMany(db.Avatar);

db.Avatar.belongsToMany(db.User, { through: 'avatar_likes' });
db.User.belongsToMany(db.Avatar, { through: 'avatar_likes' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
