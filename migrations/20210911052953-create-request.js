module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Requests', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            date: {
                type: Sequelize.DATE,
            },
            nurse_id: {
                type: Sequelize.INTEGER,
            },
            doctor_id: {
                type: Sequelize.INTEGER,
            },
            organization_id: {
                type: Sequelize.INTEGER,
            },
            drugstore_id: {
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
            },
            description: {
                type: Sequelize.STRING,
            },
            bp: {
                type: Sequelize.STRING,
            },
            height: {
                type: Sequelize.INTEGER,
            },
            weight: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('Requests');
    },
};
