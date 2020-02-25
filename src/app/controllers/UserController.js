const yup = require('yup');

const User = require('../models/User');
const UserSchema = require('../schemas/UserSchema');

class UserController {
  async index(req, res) {
    const loggedMongo = await UserSchema.findOne({ id: req.userId });

    const usersMongo = await UserSchema.find({
      $and: [
        { _id: { $ne: loggedMongo._id } },
        { _id: { $nin: loggedMongo.likes } },
        { _id: { $nin: loggedMongo.dislikes } },
      ],
    });

    res.send(usersMongo);
  }

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

    const { id, name, email } = await User.create(req.body);

    await UserSchema.create({
      id,
      email,
    });

    return res.json({
      id,
      name,
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

    const { oldPassword } = req.body;

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password not match' });
    }

    const { id, name, email } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

module.exports = new UserController();
