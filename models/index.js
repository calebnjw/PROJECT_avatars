import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

// import models from ./model.js
import initUserModel from './users.js';
import initAvatarModel from './avatars.js';
import initAvatarBackgroundModel from './avatar-background.js';
import initAvatarBaseModel from './avatar-base.js';
import initAvatarFaceModel from './avatar-face.js';

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
db.AvatarBackground = initAvatarBackgroundModel(sequelize, Sequelize.DataTypes);
db.AvatarBase = initAvatarBaseModel(sequelize, Sequelize.DataTypes);
db.AvatarFace = initAvatarFaceModel(sequelize, Sequelize.DataTypes);

// associations between models
// db.Model.belongsTo(db.Model);
// db.Model.hasMany(db.Model);
// db.Model.belongsToMany(db.Model);
db.Avatar.belongsTo(db.User);
db.User.hasMany(db.Avatar);

db.AvatarBackground.belongsTo(db.Avatar);
db.AvatarBase.belongsTo(db.Avatar);
db.AvatarFace.belongsTo(db.Avatar);
db.Avatar.hasMany(db.AvatarBackground);
db.Avatar.hasMany(db.AvatarBase);
db.Avatar.hasMany(db.AvatarFace);

db.Avatar.belongsToMany(db.User, { through: 'avatar_likes' });
db.User.belongsToMany(db.Avatar, { through: 'avatar_likes' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
