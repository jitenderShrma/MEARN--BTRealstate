const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(input) {
  input.email = !isEmpty(input.email) ? input.email : '';
  input.password = !isEmpty(input.password) ? input.password : '';
  const errors = {};
  // validate email field
  if (!Validator.isEmail(input.email)) {
    errors.email = 'Use a valid email';
  }
  if (isEmpty(input.email)) {
    errors.email = 'Email required';
  }
  if (!Validator.isLength(input.password, { min: 4, max: 30 })) {
    errors.password = 'Password Must be b/w 4 to 30 charactor';
  }
  if (isEmpty(input.password)) {
    errors.password = 'Password required';
  }


  return {
    isValid: isEmpty(errors),
    errors: errors
  }
}
