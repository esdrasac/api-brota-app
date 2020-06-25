const Yup = require('yup');

const Notification = require('../schemas/NotificationSchema');
const UserSchema = require('../schemas/UserSchema');
const Feed = require('../schemas/FeedSchema');
const User = require('../schemas/UserSchema');

class FeedController {
  async index(req, res) {
    const user = await User.findOne({ id: req.userId });

    if (!user) {
      return res.status(401).json({ error: 'Can not find user' });
    }

    const feed = await Feed.find({}).sort({ createdAt: -1 }).limit(20);
    feed.map((each) => {
      if (each.userAvatar.path) {
        each.userAvatar.path = `${process.env.BASE_FILE_URL}${each.userAvatar.path}`;
      }
    });

    return res.json(feed);
  }

  async indexById(req, res) {
    const user = await User.findOne({ id: req.userId });

    if (!user) {
      return res.status(401).json({ error: 'Can not find user' });
    }

    const feed = await Feed.find({ _id: user._id }).sort({ createdAt: -1 }).limit(20);
    feed.map((each) => {
      if (each.userAvatar.path) {
        each.userAvatar.path = `${process.env.BASE_FILE_URL}${each.userAvatar.path}`;
      }
    });

    return res.json(feed);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      content: Yup.string().required(),

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Content not founded');
    }

    const { redis, io } = req;

    const loggedUser = await UserSchema.findOne({ id: req.userId });

    const loggedSocket = await redis.get(req.userId);

    const post = {
      user_id: loggedUser._id,
      user_name: loggedUser.name,
      content: req.body.content,
      userAvatar: loggedUser.avatar_id,
    };

    await Feed.create(post);

    if (loggedSocket) {
      io.to(loggedSocket).emit('match', post);
    }

    return res.json(loggedUser);
  }

  async like(req, res) {
    const { postId } = req.params;
    const { redis, io } = req;

    const loggedUser = await UserSchema.findOne({ id: req.userId });
    const post = await Feed.findById(postId);

    if (!post) {
      return res.status(400).json({ error: 'Post not exists' });
    }

    const loggedSocket = await redis.get(req.userId);

    Notification.create({
      content: `${post.user_name} achou sua publicação da hora!`,
      user: req.userId,
    });

    if (loggedSocket) {
      io.to(loggedSocket).emit('new_post', post);
    }
    if (!(post.likes.includes(loggedUser._id))) {
      post.likes.push(loggedUser._id);
    } else {
      const index = post.likes.indexOf(loggedUser._id);
      post.likes.splice(index, 1);
    }
    await post.save();

    return res.json(loggedUser);
  }

  async setComent(req, res) {
    const { id } = req.params;
    const { redis, io } = req;

    const schema = Yup.object().shape({
      coment: Yup.string().required(),

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Coment not founded');
    }

    const loggedUser = await UserSchema.findOne({ id: req.userId });
    const post = await Feed.findOne({ _id: id });

    if (!post) {
      return res.status(400).json({ error: 'Post not exists' });
    }

    const loggedSocket = await redis.get(req.userId);

    Notification.create({
      content: `${post.user_name} Comentou em sua publicação!`,
      user: req.userId,
    });

    if (loggedSocket) {
      io.to(loggedSocket).emit('new_post', post);
    }

    const data = {
      user: loggedUser,
      coment: req.body.coment,
    };

    post.coments.push(data);

    await post.save();

    return res.json(loggedUser);
  }
}

module.exports = new FeedController();
