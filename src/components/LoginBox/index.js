// AQUI FICARÁ O CAMPO DE LOGIN
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class LoginBox extends Component {
  constructor() {
    super();
    this.state = {
      animate: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  componentDidUpdate() {
    const { animate } = this.state;
    if (animate) {
      setTimeout(() => {
        document.getElementById('login-content').style.transition = 'all 0.3s';
        document.getElementById('login').style.transition = 'all 0.5s';
      }, 200);
    }
  }

  render() {
    const { animate } = this.state;
    const { className, handleClick } = this.props;
    return (
      <div
        id="login"
        className={className}
        style={{
          height: animate ? 225 : 0,
        }}
      >
        <div
          id="login-content"
          style={{
            opacity: animate ? 1 : 0,
          }}
        >
          <form action="">
            <p>
              <strong>Área de Login</strong>
              <a href="#login" title="Área de acesso para técnicos.">
                <i className="fas fa-user-tie" />
              </a>
            </p>
            <p>
              <input type="text" name="login-lg" placeholder="Usuário" required />
            </p>
            <input type="password" name="login-pw" required />
            <nav>
              <button type="submit" onClick={handleClick} className="login-button">
                Entrar
              </button>
              <a href="/esqueci-senha" className="esqueceu">
                Esqueceu a senha?
              </a>
            </nav>
          </form>
        </div>
      </div>
    );
  }
}

LoginBox.propTypes = {
  className: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
