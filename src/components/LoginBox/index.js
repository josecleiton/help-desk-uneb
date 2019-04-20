// AQUI FICARÁ O CAMPO DE LOGIN
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Input from '../Input';

import './style.css';

class LoginBox extends Component {
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
      display: 'block',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  componentDidUpdate() {
    setTimeout(() => {
      document.getElementById('login-content').style.transition = 'all 0.3s';
      document.getElementById('login').style.transition = 'all 0.5s';
    }, 50);
  }

  handleSubmit = (formEl) => {
    const {
      history: { push },
    } = this.props;
    formEl.preventDefault();
    push('/admin');
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
            <div>
              <strong>Área de Login</strong>
              <a href="#login" title="Área de acesso para técnicos.">
                <i className="fas fa-user-tie" />
              </a>
            </div>
            <Input placeholder="Usuário" style={this.inputStyle} required />
            <Input type="password" style={this.inputStyle} required />
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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(LoginBox);
