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
        await queryInterface.bulkInsert('Users', [
            {
                email: 'admin@admin.com',
                password: 'Password01!',
                nik: '31109241284124',
                no_bpjs: '0112942143',
                faskes: '',
                role_id: 0,
                organization_id: 0,
                ttl: new Date(),
                name: 'Super Admin',
                status: 1,
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
        await queryInterface.bulkDelete('Users', null, {});
    },
};
