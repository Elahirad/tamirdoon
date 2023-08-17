module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ads', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.DataTypes.STRING
            },
            description: {
                type: Sequelize.DataTypes.STRING
            },
            location : {
                type: Sequelize.DataTypes.JSON
            },
            SuggestedPrice: {
                type: Sequelize.DataTypes.STRING
            },
            isClosed: {
                type: Sequelize.DataTypes.BOOLEAN
            },
            categoryId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'categories',
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
        await queryInterface.dropTable('ads');
    }
}