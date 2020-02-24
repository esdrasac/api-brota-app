
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    sex: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    male_interest: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    female_interest: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    birthday: {
      type: Sequelize.DATE,
    },
    bio: {
      type: Sequelize.STRING,
    },
    campus: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('users'),
};
