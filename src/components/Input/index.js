import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Input = (props) => {
  const {
    type, placeholder, style, required, submitHandler, handleChange,
  } = props;
  return (
    <input
      className="input-form-main"
      type={type}
      placeholder={placeholder}
      style={style}
      required={required}
      onSubmit={submitHandler}
      onChange={handleChange}
    />
  );
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  required: false,
  submitHandler: () => {},
  handleChange: () => {},
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
  submitHandler: PropTypes.func,
  handleChange: PropTypes.func,
};

export default Input;
