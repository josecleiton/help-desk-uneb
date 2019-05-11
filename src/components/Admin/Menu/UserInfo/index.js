import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './style.css';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      over: false,
    };
  }

  shouldComponentUpdate(prevProps, prevStates) {
    const { clicked, over } = this.state;
    const { expand } = this.props;
    return (
      expand !== prevProps.expand || clicked !== prevStates.clicked || over !== prevStates.over
    );
  }

  handleClick = () => {
    const { clicked } = this.state;
    this.setState({ clicked: !clicked });
  };

  render() {
    const { clicked, over } = this.state;
    const { expand } = this.props;
    return (
      <div
        className="user-info-wrapper"
        style={{ background: over || clicked ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)' }}
        onMouseOver={() => {
          this.setState({ over: true });
        }}
        onFocus={() => {
          this.setState({ over: true });
        }}
        onMouseLeave={() => {
          this.setState({ over: false });
        }}
      >
        <div
          role="button"
          tabIndex={0}
          className="user-info"
          onClick={this.handleClick}
          onKeyPress={this.handleClick}
        >
          <i className="fas fa-user-shield fa-2x" title="Administrador" />
          {expand && (
            <ul>
              <li>
                Bem-vindo:
                {' '}
                <strong>José Cleiton</strong>
              </li>
              <li>Online há: X minutos</li>
            </ul>
          )}
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

UserInfo.propTypes = {
  expand: PropTypes.bool.isRequired,
};
