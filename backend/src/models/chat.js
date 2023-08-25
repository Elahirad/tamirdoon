const {sequelize} = require("../../config/db");
const {DataTypes} = require("sequelize");
const User =  require('./user');

const Chat = sequelize.define('Chat', {
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    from: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    to: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {tableName: 'chats'});

Chat.belongsTo(User, {as: 'sender', foreignKey: 'from'});
User.hasOne(Chat, {as: 'sender', foreignKey: 'from'})

Chat.belongsTo(User, {as: 'receiver', foreignKey: 'to'});
User.hasOne(Chat, {as: 'receiver', foreignKey: 'to'});

Chat.hasMany(Chat, {foreignKey: 'replyTo'})
Chat.belongsTo(Chat, {foreignKey: 'replyTo'});

module.exports = Chat;

