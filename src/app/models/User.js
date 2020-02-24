const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const { Model } = Sequelize;

class User extends Model {
  static init(sequelize) {
    super.init({
      email: Sequelize.STRING,
      name: Sequelize.STRING,
      sex: Sequelize.STRING,
      male_interest: Sequelize.BOOLEAN,
      female_interest: Sequelize.BOOLEAN,
      birthday: Sequelize.DATE,
      bio: Sequelize.STRING,
      campus: Sequelize.STRING,
      phone: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      admin: Sequelize.BOOLEAN,

    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
module.exports = User;
