const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");

const Ad = sequelize.define('Ad', {
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    location : {
        type: DataTypes.STRING
    },
    SuggestedPrice: {
        type: DataTypes.STRING
    }
});