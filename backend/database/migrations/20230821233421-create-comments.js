module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('comments', {
            title:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            description :{
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            positivePoints:{
                types: Sequelize.DataTypes.STRING
            },
            negativePoints:{
                types: Sequelize.DataTypes.STRING
            },
            status: {
                type: Sequelize.DataTypes.ENUM('pending', 'accepted', 'rejected'),
                default: 'pending'
            },
            isRecommended:{
                type: Sequelize.DataTypes.BOOLEAN,
            },
            customerId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'customers',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            servicemanId: {
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
        await queryInterface.dropTable('comments');
    }
}
