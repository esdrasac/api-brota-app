module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'users',
    'sex',
    {
      type: Sequelize.STRING,
      allowNull: true,
    },
  ),

  down: (queryInterface) => queryInterface.removeColumn('users', 'sex'),
};
