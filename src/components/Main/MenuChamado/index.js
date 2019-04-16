import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class MenuChamado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false,
    };
    this.botoes = ''; // OS BOTÕES ACOMPANHAR/CRIAR CHAMADO FICARÃO TEMPORARIAMENTE AQUI
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  buscaChamado = () => {
    const { escListener } = this.props;
    escListener('Buscar');
    // let botoesEl = document.getElementById("botoes");
    // ReactDOM.unmountComponentAtNode(botoesEl);
    // ReactDOM.render(<BuscarChamado onKeyDown={this.listenEsc} />, botoesEl);
  };

  criaChamado = () => {
    const { escListener } = this.props;
    escListener('Criar');
    // let botoesEl = document.getElementById("botoes");
    // ReactDOM.unmountComponentAtNode(botoesEl);
    // ReactDOM.render(<BuscarChamado onKeyDown={this.listenEsc} />, botoesEl);
  };


  render() {
    const { animate } = this.state;
    return (
      <div id="botoes" style={{ opacity: animate ? 1 : 0, }}>
        <button type="button" className="criar" onClick={this.criaChamado}> Criar Chamado</button>
        <button type="button" className="acompanhar" onClick={this.buscaChamado}>Acompanhar Chamado</button>
      </div>
    );
  }
}

MenuChamado.propTypes = {
  escListener: PropTypes.func.isRequired,
};
