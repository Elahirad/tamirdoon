const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const {User} = require('./user');
const {Image} = require('./image');


const Ad = sequelize.define('Ad', {
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    location : {
        type: DataTypes.JSON,
        validate: {
            isValidObject(value) {
                if (!value || typeof value !== 'object') {
                    throw new Error('Invalid location object');
                }
                if (typeof value.latitude !== 'number' || typeof value.longitude !== 'number') {
                    throw new Error('Missing required keys in location object');
                }
            },
        }
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

Ad.belongsToMany(Image, { through: 'adImages' });
Image.belongsToMany(Ad, { through: 'adImages' });

module.exports = Ad;