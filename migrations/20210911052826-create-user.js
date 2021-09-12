module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            nik: {
                type: Sequelize.STRING,
            },
            no_bpjs: {
                type: Sequelize.STRING,
            },
            faskes: {
                type: Sequelize.STRING,
            },
            role_id: {
                type: Sequelize.INTEGER,
            },
            organization_id: {
                type: Sequelize.INTEGER,
            },
            ttl: {
                type: Sequelize.DATE,
            },
            name: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    },
};
