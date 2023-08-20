const {sequelize} = require("../../config/db");
const {DataTypes} = require("sequelize");
const {Admin} = require('./admin');

const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'roles' });

Role.belongsToMany(Admin, { through: 'adminRoles', foreignKey: 'roleId' });
Admin.belongsToMany(Role, { through: 'adminRoles', foreignKey : 'adminId' });

module.exports = Role;