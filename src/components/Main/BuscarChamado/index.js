import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import api from '../../../services/api';

import ErrorAlert from '../../ErrorAlert';

import './style.css';

class BuscarChamado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false,
      error: false,
    };
  }

  componentDidMount() {
    /* api
      .get('/api/chamados')
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      }); */
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  formChecker = (formObject) => {
    const inputEl = document.querySelector('input[name=input]').value;
    formObject.preventDefault();
    const {
      history: { push: redirectTo },
    } = this.props;
    const cpfReg = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})$/;
    if (!cpfReg.test(inputEl)) {
      const numberReg = /[0-9]/;
      if (inputEl.length > 7 || !numberReg.test(inputEl)) {
        this.setState({ error: true });
        return false;
      }
      redirectTo(`/chamado/${inputEl}`);
    } else {
      const cpfNumbers = inputEl
        .match(/\d+/g)
        .reduce((acc, currentVal) => acc + String(currentVal));
      redirectTo(`/chamados-cpf/${cpfNumbers}`);
    }
    return true;
  };

  listenEsc = (e) => {
    const evt = e || window.event;
    let isEscape = false;
    if ('key' in evt) {
      isEscape = evt.key === 'Escape' || evt.key === 'Esc';
    } else {
      isEscape = evt.keyCode === 27;
    }
    const { escListener } = this.props;
    escListener(isEscape ? 'Esc' : '');
  };

  render() {
    const { animate, error } = this.state;
    return (
      <div id="buscar-chamado">
        <form onKeyDown={this.listenEsc} onSubmit={this.formChecker} role="presentation">
          <input
            placeholder="Insira seu CPF ou o número do chamado..."
            name="input"
            type="text"
            style={{
              width: animate ? '80%' : '15%',
            }}
            required
          />
        </form>
        {error && <ErrorAlert>Digite um CPF ou um número de chamado válido!</ErrorAlert>}
      </div>
    );
  }
}

BuscarChamado.propTypes = {
  escListener: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(BuscarChamado);
