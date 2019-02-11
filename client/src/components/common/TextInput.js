import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInput = function ({
  type,
  name,
  placeholder,
  value,
  onChange,
  id,
  labelText,
  error,
  disabled
}) {
  return (
    <div>
      <div className="input-field">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          id='red'
          value={value}
          onChange={onChange}
          className={ classnames('', {'error': error})}
        />
        <label
         htmlFor={id}
         >{labelText}
         </label>
        <span className={ classnames('helper-text left', {'label-error': error})}>{error}</span>      
      </div>
    </div>
  );
}
TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validateClass: PropTypes.string,
  helperText: PropTypes.string,
}
export default TextInput;
