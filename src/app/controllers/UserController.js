const yup = require('yup');

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({

    });
  }
}

module.exports = new UserController();
