import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const LargeBox = (props) => {
  const { children, style, className } = props;
  return (
    <div className={className} id="large-box" style={style}>
      {children}
    </div>
  );
};

LargeBox.defaultProps = {
  style: {},
  className: 'wrapper',
};

LargeBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.any),
    PropTypes.objectOf(PropTypes.any),
  ]).isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default LargeBox;
