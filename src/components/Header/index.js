import React, { Component } from "react";
import ReactDOM from "react-dom";
import Login from "../Login";
import "./style.css";

export default class Header extends Component {
  constructor() {
    super();
    this.loginClicks = 0;
  }
  render() {
    return (
      <header id="bar">
        <nav className="menu">
          <ul>
            <li>
              <i className="fas fa-info-circle" />
              Status do Sistema: ON
            </li>
            <li className="menu-login">
              <a href="#n" onClick={this.loginRender}>
                <i className="fas fa-user" />
                Login
              </a>
              <div id="menu-login" />
            </li>
          </ul>
        </nav>
      </header>
    );
  }
  loginRender = () => {
    let menuLoginDiv = document.getElementById("menu-login");
    if (this.loginClicks % 2 === 0) {
      ReactDOM.render(<Login />, menuLoginDiv);
    } else {
      ReactDOM.unmountComponentAtNode(menuLoginDiv);
    }
    this.loginClicks++;
  };
}
