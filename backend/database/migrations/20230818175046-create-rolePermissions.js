module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('rolePermissions', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            RoleId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'roles',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            PermissionId: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'permissions',
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
        await queryInterface.dropTable('rolePermissions');
    }
}
