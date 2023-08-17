const {sequelize} = require("../../config/db");
const {DataTypes} = require("sequelize");
const Category = require('./category');
const {Serviceman} = require('./serviceman');

const Service = sequelize.define('Service', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

Category.hasMany(Service);
Service.belongsTo(Category);

Service.belongsToMany(Serviceman, { through: 'servicemanServices' });
Serviceman.belongsToMany(Service, { through: 'servicemanServices' });

module.exports = Service;
