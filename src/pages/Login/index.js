import React from 'react';

import LoginBox from '../../components/LoginBox';
import Logo from '../../components/Logo';
import './style.css';

const Login = () => (
  <div className="login-page">
    <Logo width="100" height="70" margin="0 auto" />
    <LoginBox className="login-box" />
  </div>
);

export default Login;
