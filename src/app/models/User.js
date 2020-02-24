const Sequelize = require('sequelize');

const { Model } = Sequelize;

class User extends Model {
  static init(sequelize) {
    super.init({

    }, {
      sequelize,
    });

    return this;
  }
}
module.exports = User;
