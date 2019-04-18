import React from 'react';
import PropTypes from 'prop-types';

import LoginBox from '../../components/LoginBox';
import Logo from '../../components/Logo';
import './style.css';

const Login = (props) => {
  const {
    history: { push },
  } = props;
  return (
    <div className="login-page">
      <Logo width="100" height="70" margin="0 auto" />
      <LoginBox className="login-box" redirect={push} />
    </div>
  );
};

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
