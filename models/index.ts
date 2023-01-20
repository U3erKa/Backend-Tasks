import fs = require('fs');
import path = require('path');
import Sequelize = require('sequelize');
import process = require('process');

import type { Model } from 'sequelize';
// Required to copy the json file to 'dist/' folder
import _config = require('../config/config.json');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db: { sequelize?: any; Sequelize?: any; [k: string]: Model<any, any> } = {};

const sequelize = config.use_env_variable
  // @ts-ignore
  ? new Sequelize(process.env[config.use_env_variable], config)
  // @ts-ignore
  : new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js') || file.slice(-3) === '.ts';
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  // @ts-ignore
  db[modelName]?.associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export = db;
