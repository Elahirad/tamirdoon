module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('chats', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
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
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            from: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'users',
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
        await queryInterface.addColumn('chats', 'replyTo', {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'chats',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        await queryInterface.bulkInsert('permissions', [
            {
                name: 'مشاهده چت ها',
                code: 'CHAT_READ',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'ویرایش چت ها',
                code: 'CHAT_UPDATE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'حذف چت ها',
                code: 'CHAT_DELETE',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('chats');
    }
}
