import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Input = (props) => {
  const {
    type, placeholder, style, required,
  } = props;
  return (
    <input
      className="input-form-main"
      type={type}
      placeholder={placeholder}
      style={style}
      required={required}
    />
  );
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  required: false,
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
};

export default Input;
