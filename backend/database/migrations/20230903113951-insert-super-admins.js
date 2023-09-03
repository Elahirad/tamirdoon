const bcrypt = require("bcrypt");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const firstUserId = await queryInterface.bulkInsert('users', [
            {
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], { returning: true });

        const roleId = await queryInterface.bulkInsert('roles', [
            {
                name: 'super admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], { returning: true });

        await queryInterface.bulkInsert('rolePermissions', [
            {
                roleId: roleId,
                permissionId: 40,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                roleId: roleId,
                permissionId: 41,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                roleId: roleId,
                permissionId: 42,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        const firstAdminId = await queryInterface.bulkInsert('admins', [
            {
                firstName: 'amirhosein',
                lastName: 'firoozi',
                phoneNumber: '09398615101',
                email: 'amiiirfrz@gmail.com',
                password: "$2b$10$AlBwc7cvLK/P8OoPOTmIBeVODT7xd6HyZM5xvmFSBABe5MM7actXK",
                createdAt: new Date(),
                updatedAt: new Date(),
                imageId: null,
                userId: firstUserId
            },
            {
                firstName: 'ali',
                lastName: 'elahirad',
                phoneNumber: '09152620887',
                email: 'alielahirad@gmail.com',
                password: "$2b$10$x.VbUhEhDQylwLm45/YLluGwH7fydMgs1K37Az9EgFaP.lJMCWZhK",
                createdAt: new Date(),
                updatedAt: new Date(),
                imageId: null,
                userId: firstUserId + 1
            }
        ], { returning: true });

        await queryInterface.bulkInsert('adminRoles', [
            {
                roleId: roleId,
                adminId: firstAdminId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                roleId: roleId,
                adminId: firstAdminId + 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {},
};