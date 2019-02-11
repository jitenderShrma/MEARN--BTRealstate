const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inquirySchema = Schema({
  proparty: {
    type: String,
    require: true
  },
  realter: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: String,
  },
  name: {
    type: String,
    require: true
  },
  message: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('inquirys', inquirySchema);