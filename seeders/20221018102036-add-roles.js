module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('Roles', [
            {
                id: 0,
                name: 'Admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 1,
                name: 'Doctor',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'Nurse',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                name: 'Pharmacist',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                name: 'Patient',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Roles', null, {});
    },
};
