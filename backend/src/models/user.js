const {sequelize} = require("../../config/db.js");

const User = sequelize.define('User', {}, {tableName: 'users'});

module.exports = User;