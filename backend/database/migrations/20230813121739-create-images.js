module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('images', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            filename: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            filepath: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
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
        await queryInterface.dropTable('images');
    }
}