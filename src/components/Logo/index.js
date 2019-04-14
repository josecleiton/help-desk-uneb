import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Logo = (props) => {
  const { width, height, margin } = props;
  return (
    <div className="logo-wrapper" style={{ margin, width, height }}>
      <h1 className="logo">HD7</h1>
    </div>
  );
};

Logo.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.string.isRequired,
};

export default Logo;
