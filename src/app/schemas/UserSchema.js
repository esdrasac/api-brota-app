const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
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
