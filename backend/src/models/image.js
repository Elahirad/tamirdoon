const {sequelize} = require("../../config/db");
const {DataTypes} = require("sequelize");

const Image = sequelize.define('Image', {
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filepath: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: 'images',
    });

module.exports = {Image};
