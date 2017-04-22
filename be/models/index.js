'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var databaseConfig = require(__dirname + '/../config.js').get('databaseConfig');
var db        = {};

var sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, databaseConfig);

const { readdirSync, camelCase, fileFormat } = require('../../utils');

readdirSync(__dirname, basename)
    .filter(fileFormat('.js'))
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[camelCase(model.name)] = model;
    });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
