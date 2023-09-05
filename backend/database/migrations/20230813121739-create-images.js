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

        await queryInterface.bulkInsert('permissions', [
            {
                name: 'ایجاد عکس ها',
                code: 'IMAGE_CREATE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'مشاهده عکس ها',
                code: 'IMAGE_READ',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'ویرایش عکس ها',
                code: 'IMAGE_UPDATE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'حذف عکس ها',
                code: 'IMAGE_DELETE',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('images');
    }
}