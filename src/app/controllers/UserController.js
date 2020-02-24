const yup = require('yup');

const User = require('../models/User');

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string()
        .required(),
      email: yup.string()
        .required()
        .email(),
      sex: yup.string()
        .required(),
      male_interest: yup.boolean(),
      female_interest: yup.boolean(),
      password: yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { male_interest, female_interest } = req.body;

    if (!male_interest && !female_interest) {
      return res.status(401).json({ error: 'You must choose an interest' });
    }

    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(401).json({ error: 'User already exists' });
    }

    const { id, username, email } = await User.create(req.body);

    return res.json({
      id,
      username,
      email,
    });
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      sex: yup.string(),
      male_interest: yup.boolean(),
      female_interest: yup.boolean(),
      birthday: yup.date(),
      bio: yup.string(),
      campus: yup.string(),
      phone: yup.string(),
      oldPassword: yup.string()
        .min(6),
      password: yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => (
          oldPassword ? field.required() : field)),
      confirmPassword: yup.string()
        .when('password', (password, field) => (
          password ? field.required()
            .oneOf([yup.ref('password')]) : field
        )),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.userId);

    const { male_interest, female_interest, oldPassword } = req.body;

    if (!male_interest && !female_interest) {
      return res.status(401).json({ error: 'You must choose an interest' });
    }
  }
}

module.exports = new UserController();
