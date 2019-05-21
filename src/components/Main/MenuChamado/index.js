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
    this.goBack = (
      <button
        type="button"
        onClick={() => {
          this.handleEsc('Esc');
        }}
      >
        <i className="fas fa-undo-alt" />
      </button>
    );
  }

  handleEsc = (key) => {
    if (key === 'Esc') this.setState({ buttons: this.defaultButtons });
  };

  buscaChamado = () => {
    this.setState({
      buttons: (
        <div className="goback">
          <BuscarChamado escListener={this.handleEsc} />
          {this.goBack}
        </div>
      ),
    });
  };

  criaChamado = () => {
    this.setState({
      buttons: (
        <div className="goback">
          <AreaAtendimento />
          {this.goBack}
        </div>
      ),
    });
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
