const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const Joi = require("joi");

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {tableName: 'categories'});

function categoryValidate(category) {
    const schema = Joi.object({
        name: Joi.string().required()
    });
    return schema.validate(category);
}


module.exports = {Category, categoryValidate};