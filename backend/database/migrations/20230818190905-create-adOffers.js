module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('adOffers', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            suggestedPrice:{
                type: Sequelize.DataTypes.STRING,
                default: 'adaptive',
                allowNull: false
            },
            isAccepted:{
                type: Sequelize.DataTypes.BOOLEAN,
                default: false,
            },
            adID: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'ads',
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
                name: 'ایجاد پیشنهاد ها',
                code: 'ADOFFER_CREATE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'مشاهده پیشنهاد ها',
                code: 'ADOFFER_READ',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'ویرایش پیشنهاد ها',
                code: 'ADOFFER_UPDATE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'حذف پیشنهاد ها',
                code: 'ADOFFER_DELETE',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('adOffers');
    }
}
