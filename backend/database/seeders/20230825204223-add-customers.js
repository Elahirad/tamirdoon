'use strict';

const bcrypt = require('bcrypt');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const hashedPassword = await bcrypt.hash('password123', 10);

		const usersData = [];
		for (let i = 0; i < 10; i++) {
			const user = await queryInterface.bulkInsert('users', [
				{createdAt: new Date(), updatedAt: new Date()},
			]);

			usersData.push({
				firstName: `مشتری ${i + 1}`,
				lastName: `نام خانوادگی ${i + 1}`,
				email: `user${i + 1}@example.com`,
				phoneNumber: `091548569${i.toString().padStart(2, '0')}`,
				phoneNumberIsVerified: i % 2 === 0,
				emailIsVerified: i % 3 === 0,
				password: hashedPassword,
				userId: user,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		return queryInterface.bulkInsert('customers', usersData, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('customers', null, {});

		await queryInterface.bulkDelete('users', null, {});
	},
};
