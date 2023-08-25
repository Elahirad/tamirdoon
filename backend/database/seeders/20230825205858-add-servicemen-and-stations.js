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

			const latitude = Math.random() * (90 - -90) + -90;
			const longitude = Math.random() * (180 - -180) + -180;
			const location = {
				latitude,
				longitude,
			};
			const station = await queryInterface.bulkInsert('serviceStations', [
				{
					name: `مکان سرویس دهی ${i}`,
					location: JSON.stringify(location),
					phoneNumber: `058322245${i.toString().padStart(2, '0')}`,
					workingHoursDescription: `ساعات کاری ${i}`,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);

			usersData.push({
				firstName: `سرویس دهنده ${i + 1}`,
				lastName: `نام خانوادگی ${i + 1}`,
				email: `serviceman${i + 1}@example.com`,
				phoneNumber: `091548567${i.toString().padStart(2, '0')}`,
				phoneNumberIsVerified: i % 2 === 0,
				emailIsVerified: i % 3 === 0,
				password: hashedPassword,
				userId: user,
				serviceStationId: station,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		return queryInterface.bulkInsert('servicemen', usersData, {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('servicemen', null, {});

		await queryInterface.bulkDelete('users', null, {});
	},
};
