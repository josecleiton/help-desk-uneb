import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const TextArea = (props) => {
  const { placeholder, style, required } = props;
  return (
    <textarea className="text-area" placeholder={placeholder} style={style} required={required} />
  );
};

TextArea.defaultProps = {
  placeholder: '',
  style: null,
  required: false,
};

TextArea.propTypes = {
  placeholder: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  required: PropTypes.bool,
};

export default TextArea;
