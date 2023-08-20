const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const {Image} = require('./image');


const ServiceStation = sequelize.define('ServiceStation', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
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
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isPhoneNumberFormat(value) {
                const phoneNumberRegex = /^\d{11}$/;

                if (!phoneNumberRegex.test(value)) {
                    throw new Error('Invalid phone number format. Please use XXXX-XXX-XXXX.');
                }
            }
        }
    },
    workingHoursDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {tableName: 'serviceStations'});

ServiceStation.belongsToMany(Image, { through: 'serviceStationImages', foreignKey: 'serviceStationId'});
Image.belongsToMany(ServiceStation, { through: 'serviceStationImages', foreignKey: 'imageId' });

module.exports = ServiceStation;