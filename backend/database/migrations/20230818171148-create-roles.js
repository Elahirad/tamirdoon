module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('roles', {
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
                name: 'ایجاد نقش ادمین ها',
                code: 'ROLE_CREATE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'مشاهده نقش ادمین ها',
                code: 'ROLE_READ',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'ویرایش نقش ادمین ها',
                code: 'ROLE_UPDATE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'حذف نقش ادمین ها',
                code: 'ROLE_DELETE',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('roles');
    }
}
