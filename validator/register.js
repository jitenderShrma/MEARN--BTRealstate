const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(input) {
  input.name = !isEmpty(input.name) ? input.name : '';
  input.email = !isEmpty(input.email) ? input.email : '';
  input.password = !isEmpty(input.password) ? input.password : '';
  input.password2 = !isEmpty(input.password2) ? input.password2 : '';
  input.name = !isEmpty(input.name) ? input.name : '';

  const errors = {};
  // validate name field
  if (!Validator.isLength(input.name, { min: 2, max: 15 })) {
    errors.name = 'Name Must be b/w 2 to 15 charactor';
  }
  if (isEmpty(input.name)) {
    errors.name = 'Name required';
  }
  // validate email field
  if (!Validator.isEmail(input.email)) {
    errors.email = 'Use a valid email';
  }
  if (isEmpty(input.email)) {
    errors.email = 'Email required';
  }
  // validate password field
  // if (!Validator.isEmail(input.email)) {
  //   errors.email = 'Use a valid email';
  // }
  if (!Validator.isLength(input.password, { min: 4, max: 30 })) {
    errors.password = 'Password Must be b/w 4 to 30 charactor';
  }
  if (isEmpty(input.password2)) {
    errors.password2 = 'Conform password required';
  }
  if (input.password != input.password2) {
    errors.password2 = 'Password should be conformed';
  }
  if (isEmpty(input.password)) {
    errors.password = 'Password required';
  }


  return {
    isValid: isEmpty(errors),
    errors: errors
  }
}

//module.exports = validateRegisterInput