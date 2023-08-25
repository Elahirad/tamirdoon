const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const {Image} = require("./image");
const User = require("./user");
const Joi = require("joi");

const Admin = sequelize.define("Admin", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 2,
                max: 50,
            },
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                min: 2,
                max: 50,
            },
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "admins",
    }
);

Image.hasOne(Admin, {foreignKey: 'imageId'});
Admin.belongsTo(Image, {foreignKey: 'imageId'});

User.hasOne(Admin, {foreignKey: 'userId'});
Admin.belongsTo(User, {foreignKey: 'userId'});

Admin.beforeCreate(async (admin) => {
    try {
        const client = await Client.create();
        admin.ClientId = client.id;
    } catch (error) {
        throw new Error("Error creating user for admin");
    }
});

function adminCreateValidate(customer) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50),
        phoneNumber: Joi.string().pattern(/^\d{11}$/),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&])[A-Za-z\d@$!%^*?&]{8,}$/).required(),
    });
    return schema.validate(customer);
}

module.exports = { Admin, adminCreateValidate };