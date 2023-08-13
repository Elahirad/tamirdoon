module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('clients', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('clients');
    }
}