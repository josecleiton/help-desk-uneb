import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Input = (props) => {
  const {
    type, placeholder, width, height,
  } = props;
  return (
    <input
      className="input-form-main"
      type={type}
      placeholder={placeholder}
      style={{ width, height }}
    />
  );
};

Input.defaultProps = {
  type: 'text',
  placeholder: 'DEFAULT',
  width: '50%',
  height: '60px',
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Input;
