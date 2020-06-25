const UserSchema = require('../schemas/UserSchema');
const Notification = require('../schemas/NotificationSchema');

class LikeController {
  async store(req, res) {
    const { targetId } = req.params;
    const { redis, io } = req;

    const loggedUser = await UserSchema.findOne({ id: req.userId });
    const targetUser = await UserSchema.findOne({ id: targetId });

    if (!targetUser) {
      return res.status(400).json({ error: 'User not exists' });
    }

    if (targetUser.likes.includes(loggedUser._id)) {
      targetUser.matchQnt += 1;
      loggedUser.matchQnt += 1;
      const loggedSocket = await redis.get(req.userId);
      const targetSocket = await redis.get(targetId);

      Notification.create({
        content: `Brotou! Deu bom p/ vc e ${targetUser.name}`,
        user: req.userId,
      });

      Notification.create({
        content: `Brotou! Deu bom p/ vc e ${loggedUser.name}`,
        user: targetId,
      });

      if (loggedSocket) {
        io.to(loggedSocket).emit('match', targetUser);
      }

      if (targetSocket) {
        io.to(targetSocket).emit('match', loggedUser);
      }
    }

    loggedUser.likes.push(targetUser._id);
    targetUser.likesQnt += 1;
    await targetUser.save();
    await loggedUser.save();

    return res.json(loggedUser);
  }
}

module.exports = new LikeController();
