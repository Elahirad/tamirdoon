'use strict';

const categories = [];

for (let i = 0; i < 10; i++) {
	categories.push({
		name: `دسته بندی ${i}`,
		createdAt: new Date(),
		updatedAt: new Date(),
	});
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('categories', categories);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('categories', null, {});
	},
};
