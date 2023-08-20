module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('chats', {
            message:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            isRead:{
                type: Sequelize.DataTypes.BOOLEAN,
                default: false,
            },
            to: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'clients',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            from: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'clients',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            replyTo: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'chats',
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
        await queryInterface.dropTable('chats');
    }
}
