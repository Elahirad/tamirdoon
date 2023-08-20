const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const Ad = require('./ad');
const {Serviceman} = require('./serviceman');

const AdOffer = sequelize.define('AdOffer', {
    suggestedPrice: {
        type: DataTypes.STRING,
        default: 'adaptive'
    },
    isAccepted: {
        type: DataTypes.BOOLEAN,
        default: false
    }
}, { tableName: 'adOffers' });

AdOffer.belongsTo(Ad, { foreignKey: 'adId' });
Ad.hasMany(AdOffer, { foreignKey: 'adId' })

AdOffer.belongsTo(Serviceman, { foreignKey: 'servicemanId' });
Serviceman.hasMany(AdOffer, { foreignKey: 'servicemanId' })

module.exports = AdOffer;
