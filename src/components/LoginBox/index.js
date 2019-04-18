// AQUI FICARÁ O CAMPO DE LOGIN
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';

import './style.css';

export default class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false,
    };
    this.inputStyle = {
      width: '100%',
      height: '40px',
      padding: '10px',
      marginTop: '10px',
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

  handleSubmit = (formEl) => {
    const { redirect } = this.props;
    formEl.preventDefault();
    redirect('/admin');
  };

  render() {
    const { animate } = this.state;
    const { className } = this.props;
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
          <form onSubmit={this.handleSubmit}>
            <p>
              <strong>Área de Login</strong>
              <a href="#login" title="Área de acesso para técnicos.">
                <i className="fas fa-user-tie" />
              </a>
            </p>
            <p>
              <Input placeholder="Usuário" style={this.inputStyle} required />
            </p>
            {/* <input type="text" name="login-lg" placeholder="Usuário" required /> */}
            <p>
              <Input type="password" style={this.inputStyle} required />
            </p>
            <nav>
              <button type="submit" className="login-button">
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
  redirect: PropTypes.func.isRequired,
};
