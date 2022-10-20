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
        await queryInterface.bulkInsert('Organizations', [
            {
                name: 'RS Medika BSD',
                address: 'Kota Tangerang Selatan',
                description: 'Rumah Sakit',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Eka Hospital BSD',
                address: 'Kota Tangerang Selatan',
                description: 'Rumah Sakit',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Apotik Kimia Farma BSD',
                address: 'Kota Tangerang Selatan',
                description: 'Apotik',
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
        await queryInterface.bulkDelete('Organizations', null, {});
    },
};
