const Validator = require('validator');
const isEmpty = require('./isEmpty');

export default function (input) {
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
  input.bathrooms = !isEmpty(input.bathrooms) ? input.bathrooms : '';
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
  // bathrooms validate
  if (isEmpty(input.bathrooms)) {
    errors.bathrooms = 'bathrooms required'
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
  // description validate
  if (!isEmpty(input.description)) {
    errors.description = 'description must be b/w 10 to 300 charactor'
  }

  // image field validate ----------------------------------------
  
  //validate image0
  if (input.image0 === undefined || input.image0 === null) {
    errors.image0 = 'image require';
  }
  if (!(input.image0 === undefined || input.image0 === null)) {
    
    if (!(input.image0.type === 'image/jpeg' | input.image0.type === 'image/jpg' | input.image0.type === 'image/png')) {
      errors.image0 = 'image format must be png | jpeg | jpg';
    }
  }
  //validate image1
  if (input.image1 === undefined || input.image1 === null) {
    errors.image1 = 'image require';
  }
  if (!(input.image1 === undefined || input.image1 === null)) {
    if (!(input.image1.type === 'image/jpeg' | input.image1.type === 'image/jpg' | input.image1.type === 'image/png')) {
      errors.image1 = 'image format must be png | jpeg | jpg';
    }
  }
  //validate image2
  if (input.image2 === undefined || input.image2 === null) {
    errors.image2 = 'image require';
  }
  if (!(input.image2 === undefined || input.image2 === null)) {
    if (!(input.image2.type === 'image/jpeg' | input.image2.type === 'image/jpg' | input.image2.type === 'image/png')) {
      errors.image2 = 'image format must be png | jpeg | jpg';
    }
  }
  //validate image3
  if (input.image3 === undefined || input.image3 === null) {
    errors.image3 = 'image require';
  }
  if (!(input.image3 === undefined || input.image3 === null)) {
    if (!(input.image3.type === 'image/jpeg' | input.image3.type === 'image/jpg' | input.image3.type === 'image/png')) {
      errors.image3 = 'image format must be png | jpeg | jpg';
    }
  }
  //validate image4
  if (input.image4 === undefined || input.image4 === null) {
    errors.image4 = 'image require';
  }
  if (!(input.image4 === undefined || input.image4 === null)) {
    if (!(input.image4.type === 'image/jpeg' | input.image4.type === 'image/jpg' | input.image4.type === 'image/png')) {
      errors.image4 = 'image format must be png | jpeg | jpg';
    }
  }
  return {
    isValid: isEmpty(errors),
    errors: errors
  }
}



