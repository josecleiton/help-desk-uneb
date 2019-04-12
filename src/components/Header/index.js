import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from '../Login';
import './style.css';

export default class Header extends Component {
  constructor() {
    super();
    this.loginClicks = 0;
  }

  loginRender = () => {
    const menuLoginLi = document.getElementsByClassName('menu-login')[0];
    const menuLoginDiv = document.getElementById('menu-login');
    if (this.loginClicks % 2 === 0) {
      ReactDOM.render(<Login />, menuLoginDiv);
      menuLoginLi.style.backgroundColor = '#ef191a';
    } else {
      document.getElementById('login').style.height = 0;
      document.getElementById('login-content').style.opacity = 0;
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(menuLoginDiv);
        menuLoginLi.style.backgroundColor = '';
      }, 300);
    }
    this.loginClicks += 1;
  };

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
              <span
                role="presentation"
                style={{ cursor: 'pointer' }}
                onClick={this.loginRender}
                onKeyDown={() => {}}
              >
                <i className="fas fa-user" />
                Login
              </span>
              <div id="menu-login" />
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
