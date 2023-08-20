const {sequelize} = require("../../config/db");
const {DataTypes} = require("sequelize");
const Role = require('./role');

const Permission = sequelize.define('Permission', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {tableName: 'permissions'});

Role.belongsToMany(Permission, { through: 'rolePermissions', foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: 'rolePermissions', foreignKey: 'permissionId' });

module.exports = Permission;
