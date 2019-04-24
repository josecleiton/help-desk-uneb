import React, { Component } from 'react';

import BuscarChamado from '../BuscarChamado';
import AreaAtendimento from '../AreaAtendimento';

import './style.css';

export default class MenuChamado extends Component {
  constructor(props) {
    super(props);
    this.defaultButtons = (
      <>
        <button type="button" className="criar" onClick={this.criaChamado}>
          {' '}
          Criar Chamado
        </button>
        <button type="button" className="acompanhar" onClick={this.buscaChamado}>
          Acompanhar Chamado
        </button>
      </>
    );
    this.state = {
      animate: false,
      buttons: this.defaultButtons,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  handleEsc = (key) => {
    if (key === 'Esc') this.setState({ buttons: this.defaultButtons });
  };

  buscaChamado = () => {
    this.setState({ buttons: <BuscarChamado escListener={this.handleEsc} /> });
  };

  criaChamado = () => {
    this.setState({ buttons: <AreaAtendimento /> });
  };

  render() {
    const { animate, buttons } = this.state;
    return (
      <div className="main-buttons" style={{ opacity: animate ? 1 : 0 }}>
        {buttons}
      </div>
    );
  }
}
