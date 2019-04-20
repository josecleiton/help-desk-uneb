import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const TextArea = (props) => {
  const { placeholder, style } = props;
  return <textarea className="text-area" placeholder={placeholder} style={style} />;
};

TextArea.defaultProps = {
  placeholder: '',
  style: {},
};

TextArea.propTypes = {
  placeholder: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
};

export default TextArea;
