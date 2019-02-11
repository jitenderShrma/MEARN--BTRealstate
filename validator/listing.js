const Validator = require('validator');
const path = require('path');
const isEmpty = require('./isEmpty');

exports.checkFileType = function (file, cb) {

  // file type
  const fileType = /jpg|jpeg|png|gif/;
  const extensionType = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileType.test(file.mimetype);

  if (extensionType && mimeType) {
    cb(null, true);
  } else {
    const errors = {
      image: 'Select a image only'
    }
    cb(errors);
  }
}

exports.validateListingInput = function (input, files) {
  input.realter = !isEmpty(input.realter) ? input.realter : '';
  input.title = !isEmpty(input.title) ? input.title : '';
  // address
  input.street = !isEmpty(input.street) ? input.street : '';
  input.city = !isEmpty(input.city) ? input.city : '';
  input.zipcode = !isEmpty(input.zipcode) ? input.zipcode : '';
  input.state = !isEmpty(input.state) ? input.state : '';
  input.price = !isEmpty(input.price) ? input.price : '';

  // specification
  input.badrooms = !isEmpty(input.badrooms) ? input.badrooms : '';
  input.garage = !isEmpty(input.garage) ? input.garage : '';
  input.sqft = !isEmpty(input.sqft) ? input.sqft : '';
  input.lot_size = !isEmpty(input.lot_size) ? input.lot_size : '';

  input.isPublish = !isEmpty(input.isPublish) ? input.isPublish : '';

  const errors = {};

  // realter validate
  if (!Validator.isLength(input.realter, { min: 2, max: 20 })) {
    errors.realter = 'realter  must be b/w 2 to 20 charactor'
  }
  if (isEmpty(input.realter)) {
    errors.realter = 'realter required'
  }
  // title validate
  if (!Validator.isLength(input.title, { min: 2, max: 20 })) {
    errors.title = 'title  must be b/w 2 to 20 charactor'
  }
  if (isEmpty(input.title)) {
    errors.title = 'title required'
  }
  // street validate
  if (isEmpty(input.street)) {
    errors.street = 'street required'
  }
  // city validate
  if (isEmpty(input.city)) {
    errors.city = 'city required'
  }
  // zipcode validate
  if (isEmpty(input.zipcode)) {
    errors.zipcode = 'zipcode required'
  }
  // state validate
  if (isEmpty(input.state)) {
    errors.state = 'state required'
  }
  // price validate
  if (isEmpty(input.price)) {
    errors.price = 'price required'
  }
  // badrooms validate
  if (isEmpty(input.badrooms)) {
    errors.badrooms = 'badrooms required'
  }
  // garage validate
  if (isEmpty(input.garage)) {
    errors.garage = 'garage required'
  }
  // sqft validate
  if (isEmpty(input.sqft)) {
    errors.sqft = 'sqft required'
  }
  // lot_size validate
  if (isEmpty(input.lot_size)) {
    errors.lot_size = 'lot_size required'
  }
  // isPublish validate
  if (isEmpty(input.isPublish)) {
    errors.isPublish = 'isPublish required'
  }

  return {
    isValid: isEmpty(errors),
    errors: errors
  }
}



