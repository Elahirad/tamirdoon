const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const {Customer} = require('./customer');
const {Image} = require('./image');
const {Category} = require('./category');


const Ad = sequelize.define('Ad', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
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
        type: DataTypes.BOOLEAN,
        default: false
    }
}, {tableName: 'ads'});

Customer.hasMany(Ad, {foreignKey: 'customerId'});
Ad.belongsTo(Customer, {foreignKey: 'customerId'});

Ad.belongsToMany(Image, { through: 'adImages', foreignKey: 'adId' });
Image.belongsToMany(Ad, { through: 'adImages', foreignKey: 'imageId' });

Category.hasMany(Ad, {foreignKey: 'categoryId'});
Ad.belongsTo(Category, {foreignKey: 'categoryId'});

module.exports = Ad;