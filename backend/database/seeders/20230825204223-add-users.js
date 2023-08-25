'use strict';

const bcrypt = require('bcrypt');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const hashedPassword = await bcrypt.hash('password123', 10);

		const usersData = [];
		for (let i = 0; i < 10; i++) {
			const client = await queryInterface.bulkInsert('clients', [
				{createdAt: new Date(), updatedAt: new Date()},
			]);

			usersData.push({
				firstName: `کاربر ${i + 1}`,
				lastName: `نام خانوادگی ${i + 1}`,
				email: `user${i + 1}@example.com`,
				phoneNumber: `091548569${i.toString().padStart(2, '0')}`,
				phoneNumberIsVerified: i % 2 === 0,
				emailIsVerified: i % 3 === 0,
				password: hashedPassword,
				clientId: client,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		return queryInterface.bulkInsert('users', usersData, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {});

		await queryInterface.bulkDelete('clients', null, {});
	},
};
