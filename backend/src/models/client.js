const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");

const Client = sequelize.define('Client', {}, {tableName: 'clients'});

module.exports = Client;