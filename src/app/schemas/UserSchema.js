const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
  sex: {
    type: String,
  },
  male_interest: {
    type: Boolean,
  },
  female_interest: {
    type: Boolean,
  },
  email: {
    type: String,
  },
  avatar_id: {
    name: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Users', UserSchema);
