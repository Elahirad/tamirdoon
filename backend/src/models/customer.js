const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const {Image} = require("./image");
const User = require("./user");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");

const Customer = sequelize.define("Customer", {
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
            validate: {
                isPhoneNumberFormat(value) {
                    const phoneNumberRegex = /^\d{11}$/;

                    if (!phoneNumberRegex.test(value)) {
                        throw new Error(
                            "Invalid phone number format. Please use XXXX-XXX-XXXX."
                        );
                    }
                },
            },
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
        },
        emailIsVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        phoneNumberIsVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "customers",
    }
);

Customer.prototype.generateAuthToken = function (req, res) {
    const token =  jwt.sign(
        {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
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

Image.hasOne(Customer, {foreignKey: 'imageId'});
Customer.belongsTo(Image, {foreignKey: 'imageId'});

User.hasOne(Customer, {foreignKey: 'userId'});
Customer.belongsTo(User, {foreignKey: 'userId'});

Customer.beforeCreate(async (customer) => {
    try {
        const user = await User.create();
        customer.UserId = user.id;
    } catch (error) {
        throw new Error("Error creating user for customer");
    }
});

function customerSignUpValidate(customer) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        phoneNumber: Joi.string()
            .pattern(/^\d{11}$/)
            .required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&])[A-Za-z\d@$!%^*?&]{8,}$/
            )
            .required(),
    });
    return schema.validate(customer);
}

function customerSignInValidate(customer) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        remember: Joi.boolean(),
    });
    return schema.validate(customer);
}

module.exports = {Customer, customerSignUpValidate, customerSignInValidate};
