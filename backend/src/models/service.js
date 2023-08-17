const {sequelize} = require("../../config/db");
const {DataTypes} = require("sequelize");
const Category = require('./category');

const Service = sequelize.define('Service', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

Category.hasMany(Service);
Service.belongsTo(Category);

module.exports = Service;
