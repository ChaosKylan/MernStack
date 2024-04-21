const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: {
    type: [String],
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Shopping List', shoppingListSchema);
