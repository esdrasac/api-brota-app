const Notification = require('../schemas/NotificationSchema');
const User = require('../schemas/UserSchema');

class NotificationController {
  async index(req, res) {
    const user = await User.findOne({ id: req.userId });

    if (!user) {
      return res.status(401).json({ error: 'Can not find user' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    }).sort({ createdAt: -1 }).limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );

    return res.json(notification);
  }
}

module.exports = new NotificationController();
