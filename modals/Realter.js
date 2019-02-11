const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const realterSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  phone: {
    type: String,
    require: true
  },
  isMVP: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('realters', realterSchema);