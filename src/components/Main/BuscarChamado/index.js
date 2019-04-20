import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

class BuscarChamado extends Component {
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
  }

  formChecker = (formObject) => {
    const inputEl = String(document.querySelector('input[name=input]').value);
    formObject.preventDefault();
    const {
      history: { push: redirectTo },
    } = this.props;
    const cpfReg = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})$/;
    if (!cpfReg.test(inputEl)) {
      const numberReg = /[0-9]/;
      if (inputEl.length > 7 || !numberReg.test(inputEl)) {
        const errorEl = document.getElementsByClassName('erro')[0];
        errorEl.style.opacity = 0.85;
        errorEl.innerHTML = 'Digite um CPF ou um número de chamado válido!';
        errorEl.addEventListener('mouseover', (e) => {
          e.target.style.transition = 'all 0.5s';
          e.target.style.opacity = 1;
        });
        errorEl.addEventListener('mouseout', (e) => {
          e.target.style.transition = 'all 4s';
          e.target.style.opacity = 0.85;
        });
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
    const { animate } = this.state;
    return (
      <div id="buscar-chamado">
        <form onKeyDown={this.listenEsc} onSubmit={this.formChecker} role="presentation">
          <input
            placeholder="Insira seu CPF ou o número do chamado..."
            name="input"
            style={{
              width: animate ? '75%' : '15%',
            }}
            required
          />
        </form>
        <div className="erro" />
      </div>
    );
  }
}

BuscarChamado.propTypes = {
  escListener: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(BuscarChamado);
