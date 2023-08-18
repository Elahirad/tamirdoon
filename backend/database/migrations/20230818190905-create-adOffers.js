module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('adOffers', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            suggestedPrice:{
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },
            isAccepted:{
                type: Sequelize.DataTypes.BOOLEAN,
                default: false,
            },
            AdID: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'ads',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            ServicemanId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'servicemen',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            createdAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.DataTypes.NOW,
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.DataTypes.NOW,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('adOffers');
    }
}
