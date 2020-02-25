const UserSchema = require('../schemas/UserSchema');

class LikeController {
  async store(req, res) {
    const { targetId } = req.params;

    const loggedUser = await UserSchema.findOne({ id: req.userId });
    const targetUser = await UserSchema.findOne({ id: targetId });

    if (!targetUser) {
      return res.status(400).json({ error: 'User not exists' });
    }

    if (targetUser.likes.includes(loggedUser._id)) {
      console.log('deu match');
    }

    loggedUser.likes.push(targetUser._id);
    await loggedUser.save();

    return res.json(loggedUser);
  }
}

module.exports = new LikeController();
