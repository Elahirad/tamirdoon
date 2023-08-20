const {sequelize} = require("../../config/db");
const {DataTypes} = require("sequelize");
const Client =  require('./client');

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

Chat.belongsTo(Client, {as: 'sender', foreignKey: 'from'});
Client.hasOne(Chat, {as: 'sender', foreignKey: 'from'})

Chat.belongsTo(Client, {as: 'receiver', foreignKey: 'to'});
Client.hasOne(Chat, {as: 'receiver', foreignKey: 'to'});

Chat.hasMany(Chat, {foreignKey: 'replyTo'})
Chat.belongsTo(Chat, {foreignKey: 'replyTo'});

module.exports = Chat;

