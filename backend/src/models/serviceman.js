const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const {Image} = require('./image');
const User = require('./user');
const ServiceStation = require('serviceStation');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const Serviceman = sequelize.define('Serviceman', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 2,
                max: 50
            }
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                min: 2,
                max: 50
            }
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailIsVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        phoneNumberIsVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: 'servicemen',
    });

Serviceman.prototype.generateAuthToken = function () {
    return jwt.sign({
        id: this.id,
        email: this.email,
        firstName: this.name,
        lastName: this.lastName
    }, config.get('jwtPrivateKey'));
}

Image.hasOne(Serviceman, {foreignKey: 'imageId'});
Serviceman.belongsTo(Image, {foreignKey: 'imageId'});

User.hasOne(Serviceman, {foreignKey: 'userId'});
Serviceman.belongsTo(User, {foreignKey: 'userId'});

ServiceStation.hasMany(Serviceman, {foreignKey: 'serviceStationId'});
Serviceman.belongsTo(ServiceStation, {foreignKey: 'serviceStationId'});

Serviceman.beforeCreate(async (user) => {
    try {
        const client = await Client.create();
        user.ClientId = client.id;
    } catch (error) {
        throw new Error('Error creating user for serviceman');
    }
});

function servicemanSignUpValidate(serviceman) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50),
        phoneNumber: Joi.string().pattern(/^\d{11}$/),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&])[A-Za-z\d@$!%^*?&]{8,}$/).required()
    })
    return schema.validate(serviceman);
}

function servicemanSignInValidate(serviceman) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
    return schema.validate(serviceman);
}

module.exports = {Serviceman, servicemanSignUpValidate, servicemanSignInValidate};
