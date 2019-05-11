import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './style.css';

export default class CriarChamado extends Component {
  constructor() {
    super();
    this.state = {
      animate: false,
      redirect: false,
      select: '',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  handleSubmit = () => {
    const ValSelect = document.getElementById('Select-chamado').value;
    if (ValSelect !== '') {
      this.setState({ redirect: true, select: ValSelect });
    } else {
      alert('Selecione o setor desejado');
    }
  };

  setRedirect = () => {
    const { redirect, select } = this.state;
    return redirect ? <Redirect to={`abrir-chamado?${select}`} /> : null;
  };

  render() {
    const { animate } = this.state;
    return (
      <div className="setor-chamado" style={{ opacity: animate ? 1 : 0 }}>
        <h2>SETOR DE ATENDIMENTO</h2>
        <div>
          <select name="area" id="Select-chamado">
            <option value="">Selecione o setor</option>
            <option value="RH">RH</option>
            <option value="TI">TI</option>
            <option value="COMUNICACAO">COMUNICAÇÃO </option>
            <option value="ADMINISTRATIVO">ADMINISTRATIVO </option>
            <option value="FINANCEIRO">FINANCEIRO </option>
            <option value="ACADEMICA">ACADÊMICA </option>
          </select>
          <button type="submit" onClick={this.handleSubmit}>
            Confirmar
          </button>
          {this.setRedirect()}
        </div>
      </div>
    );
  }
}
