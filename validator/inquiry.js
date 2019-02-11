const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateInquiryInput(input) {
  input.email = !isEmpty(input.email) ? input.email : '';
  input.name = !isEmpty(input.name) ? input.name : '';
  input.proparty = !isEmpty(input.proparty) ? input.proparty : '';
  input.realter = !isEmpty(input.realter) ? input.realter : '';

  const errors = {};
  // validate email field
  if (!Validator.isEmail(input.email)) {
    errors.email = 'Use a valid email';
  }
  if (isEmpty(input.email)) {
    errors.email = 'Email required';
  }
  if (isEmpty(input.name)) {
    errors.name = 'name required';
  }
  if (isEmpty(input.proparty)) {
    errors.proparty = 'proparty required';
  }
  if (isEmpty(input.realter)) {
    errors.realter = 'realter required';
  }
  return {
    isValid: isEmpty(errors),
    errors: errors
  }
}
