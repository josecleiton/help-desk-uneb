// AQUI FICARÁ O CAMPO DE LOGIN
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import isAuth from '../Admin/Auth';
import Input from '../Input';

import './style.css';

const inputStyle = {
  width: '100%',
  height: '40px',
  padding: '10px',
  marginTop: '10px',
  display: 'block',
};
class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
    if (isAuth()) {
      const {
        history: { push },
        location,
      } = this.props;
      push({ pathname: '/admin', state: { from: location } });
    }
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
      location,
    } = this.props;
    formEl.preventDefault();
    const inputs = document.querySelectorAll('div#login-content input');
    const usuario = inputs[0].value;
    const senha = inputs[1].value;
    api.post('/api/auth/login.php', { usuario, senha }).then((res) => {
      const { data } = res;
      if (!data.error) {
        localStorage.setItem('HD7-AuthToken', data.token);
        localStorage.setItem('HD7-AuthTokenExpire', data.expira);

        push({ pathname: '/admin', state: { from: location, user: data.usuario } });
      } else {
        // algum error aconteceu
        alert(data.mensagem);
      }
    });
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
            <Input placeholder="Usuário" style={inputStyle} required />
            <Input type="password" style={inputStyle} required />
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
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(LoginBox);
