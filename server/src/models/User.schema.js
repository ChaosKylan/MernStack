const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: String,
    unique: true,
  },
  password: {
    type: String,
    required: String,
  },
});

module.exports = mongoose.model('User', userSchema);
