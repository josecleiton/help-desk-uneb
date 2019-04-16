import React from 'react';
import logo from '../../assets/logo.png';
import './style.css';

const Footer = () => (
  <footer className="footer-page">
    <ul>
      <li>DIRETRIZES DE USO</li>
      <li>QUEM SOMOS</li>
      <li>SUGESTÕES</li>
    </ul>
    <img src={logo} alt="" width="100px" />
  </footer>
);

export default Footer;
