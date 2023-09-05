module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('categories', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
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
                name: 'ایجاد دسته بندی ها',
                code: 'CATEGORY_CREATE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'مشاهده دسته بندی ها',
                code: 'CATEGORY_READ',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'ویرایش دسته بندی ها',
                code: 'CATEGORY_UPDATE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'حذف دسته بندی ها',
                code: 'CATEGORY_DELETE',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('categories');
    }
}