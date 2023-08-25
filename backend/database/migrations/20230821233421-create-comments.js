module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('comments', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title:{
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            description :{
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            positivePoints:{
                type: Sequelize.DataTypes.STRING
            },
            negativePoints:{
                type: Sequelize.DataTypes.STRING
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

        await queryInterface.bulkInsert('permissions', [
            {
                name: 'مشاهده نظرات',
                code: 'COMMENT_READ',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'ویرایش نظرات',
                code: 'COMMENT_UPDATE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'حذف نظرات',
                code: 'COMMENT_DELETE',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('comments');
    }
}
