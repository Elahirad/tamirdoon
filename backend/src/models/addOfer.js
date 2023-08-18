const {DataTypes} = require("sequelize");
const {sequelize} = require("../../config/db.js");
const Ad = require('./ad');
const {Serviceman} = require('./serviceman');

const AdOffer = sequelize.define('AdOffer', {
    suggestedPrice: {
        type: DataTypes.NUMBER
    },
    isAccepted: {
        type: DataTypes.BOOLEAN,
        default: false
    }
});

AdOffer.belongsTo(Ad, { foreignKey: 'AdId' });
AdOffer.belongsTo(Serviceman, { foreignKey: 'ServicemanId' });

module.exports = AdOffer;
