const {sequelize} = require("../../config/db");
const {DataTypes} = require("sequelize");
const {Category} = require('./category');
const {Serviceman} = require('./serviceman');

const Service = sequelize.define('Service', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, { tableName: 'services' });

Category.hasMany(Service, {foreignKey: 'categoryId'});
Service.belongsTo(Category, {foreignKey: 'categoryId'});

Service.belongsToMany(Serviceman, { through: 'servicemanServices', foreignKey: 'serviceId'});
Serviceman.belongsToMany(Service, { through: 'servicemanServices' , foreignKey: 'servicemanId'});

module.exports = Service;
