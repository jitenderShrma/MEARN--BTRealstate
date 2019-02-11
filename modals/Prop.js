const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propSchema = new Schema({
  realter: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  address: {
    street: {
      type: String,
      require: true
    },
    city: {
      type: String,
      require: true
    },
    zipcode: {
      type: String,
      require: true
    },
    state: {
      type: String,
      require: true
    },
  },
  price: {
    type: String,
    require: true
  },
  specification: {
    badrooms: {
      type: String,
      require: true
    },
    garage: {
      type: String,
      require: true
    },
    sqft: {
      type: String,
      require: true
    },
    lot_size: {
      type: String,
      require: true
    },
    bathrooms: {
      type: String,
      require: true
    }
  },
  image0: {
    type: String
  },
  image1: {
    type: String
  },
  image2: {
    type: String
  },
  image3: {
    type: String
  },
  image4: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  isPublish: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model('props', propSchema);
