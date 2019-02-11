const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRealterInput(input) {
  input.name = !isEmpty(input.name) ? input.name : '';
  input.email = !isEmpty(input.email) ? input.email : '';
  input.description = !isEmpty(input.description) ? input.description : '';
  input.phone = !isEmpty(input.phone) ? input.phone : '';
  
  const errors = {};

  // input fileds validate --------------------------- //
  // validate name field
  if (!Validator.isLength(input.name, { min: 2, max: 30 })) {
    errors.name = 'name must be b/w 2 to 30 charactor';
  }
  if (isEmpty(input.name)) {
    errors.name = 'name required';
  }
  // validate email field
  if (!Validator.isEmail(input.email)) {
    errors.email = 'Use a valid email';
  }
  if (isEmpty(input.email)) {
    errors.email = 'Email required';
  }
  // validate description field
  if (!isEmpty(input.description)) {
    if (!Validator.isLength(input.description, { min: 10, max: 300 })) {
      errors.description = 'description must be b/w 10 to 300 charactor';
    }
  }
  // validate phone field
  if (!Validator.isLength(input.phone, { min: 10, max: 10 })) {
    errors.phone = 'Use a valid phone';
  }
  if (isEmpty(input.phone)) {
    errors.phone = 'phone number required';
  }

  // image field validate ----------------------------------------

  // check image type
  if (input.image === undefined || input.image === null) {
    errors.image = 'image require';
  }
  if (!(input.image === undefined || input.image === null)) {
    
    if (!(input.image.type === 'image/jpeg' | input.image.type === 'image/jpg' | input.image.type === 'image/png')) {
      errors.image = 'image format must be png | jpeg | jpg';
    }
  }
  return {
    isValid: isEmpty(errors),
    errors: errors
  }
}
