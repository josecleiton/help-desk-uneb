import React, { Component } from 'react';

import Header from '../../Header';
import LoginBox from '../../LoginBox';

import './style.css';

export default class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { login: 0 };
  }

  loginRender = () => {
    const { login } = this.state;
    this.setState({ login: login + 1 });
  };

  /*
  loginRender = () => {
    if (this.loginClicks % 2 === 0) {
      ReactDOM.render(
        <BrowserRouter>
          <LoginBox maxHeight={225} className="main-login" />
        </BrowserRouter>,
        menuLoginDiv,
      );
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
*/
  render() {
    const { login } = this.state;
    let loginEl = '';
    if (login) {
      const menuLoginLi = document.getElementsByClassName('menu-login')[0];
      if (login % 2) {
        loginEl = <LoginBox maxHeight={255} className="main-login" />;
        menuLoginLi.style.backgroundColor = '#ef191a';
      } else {
        menuLoginLi.style.backgroundColor = '';
        loginEl = '';
      }
    }
    return (
      <Header>
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
              <div id="menu-login">{loginEl}</div>
            </li>
          </ul>
        </nav>
      </Header>
    );
  }
}
