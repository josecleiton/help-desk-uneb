import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const LargeBox = (props) => {
  const {
    children, width, height, margin,
  } = props;
  return (
    <div className="wrapper" id="large-box" style={{ width, height, margin }}>
      {children}
    </div>
  );
};

LargeBox.defaultProps = {
  width: '100%',
  height: 'auto',
  margin: 'auto',
};

LargeBox.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
};

export default LargeBox;
