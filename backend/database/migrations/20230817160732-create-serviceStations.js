module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('serviceStations', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            location : {
                type: Sequelize.DataTypes.JSON
            },
            phoneNumber: {
                type: Sequelize.DataTypes.STRING
            },
            workingHoursDescription: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
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
                name: 'مشاهده مراکز خدمات',
                code: 'SERVICESTATION_READ',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'ویرایش مراکز خدمات',
                code: 'SERVICESTATION_UPDATE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'حذف مراکز خدمات',
                code: 'SERVICESTATION_DELETE',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },
    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('serviceStations');
  }
};
