const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const {User} = require('./user');

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
    },
    isClosed: {
        type: DataTypes.BOOLEAN
    }
}, {tableName: 'ads'});

User.hasMany(Ad);
Ad.belongsTo(User);

module.exports = Ad;