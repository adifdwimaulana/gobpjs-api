module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Requestmedicines', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            request_id: {
                type: Sequelize.INTEGER,
            },
            medicine_id: {
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
        await queryInterface.dropTable('Requestmedicines');
    },
};
