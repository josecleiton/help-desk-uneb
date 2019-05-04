import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './style.css';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  handleClick = () => {
    const { clicked } = this.state;
    this.setState({ clicked: !clicked });
  };

  render() {
    const { clicked } = this.state;
    return (
      <div className="user-info-wrapper">
        <div
          role="presentation"
          className="user-info"
          onClick={this.handleClick}
          onKeyPress={this.handleClick}
        >
          <i className="fas fa-user-shield fa-2x" title="Administrador" />
          <ul>
            <li>
              Bem-vindo:
              {' '}
              <strong>José Cleiton</strong>
            </li>
            <li>Online há: X minutos</li>
          </ul>
        </div>
        {clicked && (
          <>
            <hr />
            <ul className="user-info-clicked">
              <NavLink
                to="/admin/meus-dados"
                className="user-info-link"
                activeStyle={{ fontWeight: 'bolder' }}
              >
                <li>Meus dados</li>
              </NavLink>
              <NavLink
                to="/admin/sair"
                className="user-info-link"
                activeStyle={{ fontWeight: 'bolder' }}
              >
                <li>Sair</li>
              </NavLink>
            </ul>
          </>
        )}
      </div>
    );
  }
}
