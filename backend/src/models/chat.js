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
    }
});

Chat.belongsTo(Client, { as: 'from', foreignKey: 'from'});
Client.hasOne(Chat, { as: 'from', foreignKey: 'from'})
Chat.belongsTo(Client, { as: 'to', foreignKey: 'to'});
Client.hasOne(Chat, { as: 'to', foreignKey: 'to'});

Client.belongsTo(Client, { as: 'replyTo', foreignKey: 'replyTo'});

module.exports = Chat;

