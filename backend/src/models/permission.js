const {sequelize} = require("../../config/db");
const {DataTypes} = require("sequelize");
const Role = require('./role');

const Permission = sequelize.define('Permission', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Role.belongsToMany(Permission, { through: 'rolePermissions' });
Permission.belongsToMany(Role, { through: 'rolePermissions' });

module.exports = Permission;
