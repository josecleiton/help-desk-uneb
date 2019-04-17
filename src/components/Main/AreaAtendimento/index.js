import React, { Component } from 'react';
import './style.css';

export default class CriarChamado extends Component {
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

  render() {
    const { animate } = this.state;
    return (
      <div className="setor-chamado" style={{ opacity: animate ? 1 : 0 }}>
        <h2>SETOR DE ATENDIMENTO</h2>
        <div>
          <select name="" id="">
            <option value="RH">RH</option>
            <option value="TI">TI</option>
            <option value="COMUNICACAO">COMUNICAÇÃO </option>
            <option value="ADMINISTRATIVO">ADMINISTRATIVO </option>
            <option value="FINANCEIRO">FINANCEIRO </option>
            <option value="ACADEMICA">ACADÊMICA </option>
          </select>
          <button type="submit">Confirmar</button>
        </div>
      </div>
    );
  }
}
