const yup = require('yup');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const File = require('../models/File');
const authConfig = require('../../config/auth');

class SessionController {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required()
        .email(),
      password: yup
        .string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      id, name, avatar, birthday, sex, male_interest, female_interest, bio, campus, phone,
    } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
        birthday,
        sex,
        male_interest,
        female_interest,
        bio,
        campus,
        phone,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
