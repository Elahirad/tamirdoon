module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('serviceStationsImages', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            ServiceStationId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'ads',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            ImageId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'images',
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
        await queryInterface.dropTable('serviceStationsImages');
    }
}