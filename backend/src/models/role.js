const {sequelize} = require("../../config/db");
const {DataTypes} = require("sequelize");
const {Admin} = require('./admin');
const Joi = require("joi");

const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'roles' });

Role.belongsToMany(Admin, { through: 'adminRoles', foreignKey: 'roleId' });
Admin.belongsToMany(Role, { through: 'adminRoles', foreignKey : 'adminId' });

function roleCreateValidate(role) {
    const schema = Joi.object({
        name: Joi.string().required(),
        addPermissionIds: Joi.array().items(Joi.number().integer()).required(),
    });
    return schema.validate(role);
}

function roleUpdateValidate(role) {
    const schema = Joi.object({
        name: Joi.string(),
        addPermissionIds: Joi.array().items(Joi.number().integer()),
        removePermissionIds: Joi.array().items(Joi.number().integer())
    });
    return schema.validate(role);
}

module.exports = { Role, roleCreateValidate, roleUpdateValidate};