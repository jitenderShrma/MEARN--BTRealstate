const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  isAdmin: {
    type: Boolean,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('admin', adminSchema);