module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('servicemen', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                validate: {
                    min: 2,
                    max: 50
                }
            },
            lastName:{
                type: Sequelize.DataTypes.STRING,
                validate: {
                    min: 2,
                    max: 50
                }
            },
            phoneNumber: {
                type: Sequelize.DataTypes.STRING
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            emailIsVerified: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: false
            },
            phoneNumberIsVerified: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: false
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
            },
            imageId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'images',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            userId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            serviceStationId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'serviceStations',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }
        });

        await queryInterface.bulkInsert('permissions', [
            {
                name: 'ایجاد سرویس دهندگان',
                code: 'SERVICEMAN_CREATE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'مشاهده سرویس دهندگان',
                code: 'SERVICEMAN_READ',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'ویرایش سرویس دهندگان',
                code: 'SERVICEMAN_UPDATE',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'حذف سرویس دهندگان',
                code: 'SERVICEMAN_DELETE',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('servicemen');
    }
}
