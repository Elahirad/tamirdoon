module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('admins', {
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
            clientId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'clients',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('admins');
    }
}
