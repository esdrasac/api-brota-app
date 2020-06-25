const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  userAvatar: {
    name: {
      type: String,
      default: null,
    },
    path: {
      type: String,
      default: null,
    },
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'feed',
  }],
  coments: [{
    user: {
      type: Object,
      default: null,
    },
    coment: {
      type: String,
      default: null,
    },
  }],
  deleted_at: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('feed', FeedSchema);
