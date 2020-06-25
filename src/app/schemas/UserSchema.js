const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  sex: {
    type: String,
    default: null,
  },
  male_interest: {
    type: Boolean,
    default: false,
  },
  female_interest: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    default: null,
  },
  avatar_id: {
    name: {
      type: String,
      default: null,
    },
    path: {
      type: String,
      default: null,
    },
  },
  likesQnt: {
    type: Number,
    default: null,
  },
  dilikesQnt: {
    type: Number,
    default: null,
  },
  matchQnt: {
    type: Number,
    default: null,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('users', UserSchema);
