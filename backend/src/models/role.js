const {sequelize} = require("../../config/db");
const {DataTypes} = require("sequelize");
const {Admin} = require('./admin');

const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Role.belongsToMany(Admin, { through: 'adminRoles' });
Admin.belongsToMany(Role, { through: 'adminRoles' });

module.exports = Role;