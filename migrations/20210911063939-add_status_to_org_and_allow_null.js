module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Organizations', 'status', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('Users', 'faskes', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Requests', 'doctor_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('Requests', 'drugstore_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Organizations', 'status');

    await queryInterface.changeColumn('Users', 'faskes', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('Requests', 'doctor_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('Requests', 'drugstore_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
