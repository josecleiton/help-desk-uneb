import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const LargeBox = (props) => {
  const { children, style } = props;
  return (
    <div className="wrapper" id="large-box" style={style}>
      {children}
    </div>
  );
};

LargeBox.defaultProps = {
  style: {},
};

LargeBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.any),
    PropTypes.objectOf(PropTypes.any),
  ]).isRequired,
  style: PropTypes.objectOf(PropTypes.string),
};

export default LargeBox;
