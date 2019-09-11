import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Header = (props) => {
  const { children } = props;
  return <header className="bar">{children}</header>;
};

Header.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Header;
