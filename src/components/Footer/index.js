import React, { Component } from "react";
import logo from "../../assets/logo.png";
import "./style.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer-page">
        <ul>
          <li>DIRETRIZES DE USO</li>
          <li>QUEM SOMOS</li>
          <li>SUGESTÕES</li>
        </ul>
        <img src={logo} alt="" width="100px" />
      </footer>
    );
  }
}

export default Footer;
