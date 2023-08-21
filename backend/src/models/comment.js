const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const { Customer } = require('../models/customer');
const {Serviceman} = require("./serviceman");

const Comment = sequelize.define('Comment', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    positivePoints: {
        type: DataTypes.STRING
    },
    negativePoints: {
        type: DataTypes.STRING,
    },
    isAccepted: {
        type: DataTypes.BOOLEAN
    },
    isRecommended: {
        type: DataTypes.BOOLEAN
    }
}, { tableName: 'comments'});

Customer.hasMany(Comment, { foreignKey: 'customerId' });
Comment.belongsTo(Customer, { foreignKey: 'customerId' });

Serviceman.hasMany(Comment, { foreignKey: 'servicemanId' });
Comment.belongsTo(Serviceman, { foreignKey: 'servicemanId' });

module.exports = Comment;



