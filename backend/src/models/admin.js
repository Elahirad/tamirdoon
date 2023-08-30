const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const {Image} = require("./image");
const User = require("./user");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

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

Admin.prototype.generateAuthToken = function (req, res) {
    const token =  jwt.sign(
        {
            id: this.id,
            email: this.email,
        },
        config.get("jwtPrivateKey")
    );

    let maxAge = 24 * 60 * 60 * 1000;
    if(req.body.remember) maxAge = 7 * maxAge;
    res.cookie("x-auth-token", token, {
        maxAge: maxAge,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });
};

Image.hasOne(Admin, {foreignKey: 'imageId'});
Admin.belongsTo(Image, {foreignKey: 'imageId'});

User.hasOne(Admin, {foreignKey: 'userId'});
Admin.belongsTo(User, {foreignKey: 'userId'});

Admin.beforeCreate(async (admin) => {
    try {
        const user = await User.create();
        admin.userId = user.id;
    } catch (error) {
        throw new Error("Error creating user for admin");
    }
});

function adminCreateValidate(admin) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50),
        phoneNumber: Joi.string().pattern(/^\d{11}$/),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&])[A-Za-z\d@$!%^*?&]{8,}$/).required(),
        roleId: Joi.number().integer()
    });
    return schema.validate(admin);
}

function adminSignInValidate(admin) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        remember: Joi.boolean(),
    });
    return schema.validate(admin);
}
function adminUpdateValidate(admin) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50),
        lastName: Joi.string().min(2).max(50),
        phoneNumber: Joi.string().pattern(/^\d{11}$/),
        email: Joi.string().email(),
        password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&])[A-Za-z\d@$!%^*?&]{8,}$/),
        roleId: Joi.number().integer()
    });
    return schema.validate(admin);
}

module.exports = { Admin, adminCreateValidate, adminUpdateValidate, adminSignInValidate };