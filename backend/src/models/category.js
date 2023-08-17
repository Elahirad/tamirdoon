const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const Ad = require("./ad");

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {tableName: 'categories'});

Category.hasMany(Ad);
Ad.belongsTo(Category);

module.exports = Category;