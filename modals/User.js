const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('users', userSchema);