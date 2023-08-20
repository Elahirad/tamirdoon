const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const {Image} = require("./image");
const Client = require("./client");

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
        }
    },
    {
        tableName: "admins",
    }
);

Image.hasOne(Admin, {foreignKey: 'imageId'});
Admin.belongsTo(Image, {foreignKey: 'imageId'});

Client.hasOne(Admin, {foreignKey: 'clientId'});
Admin.belongsTo(Client, {foreignKey: 'clientId'});

Admin.beforeCreate(async (admin) => {
    try {
        const client = await Client.create();
        admin.ClientId = client.id;
    } catch (error) {
        throw new Error("Error creating client for admin");
    }
});

module.exports = { Admin };