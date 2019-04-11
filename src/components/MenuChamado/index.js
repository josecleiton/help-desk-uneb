import React, { Component } from "react";

import "./style.css";

export default class MenuChamado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esc: false,
      animate: false
    };
    this.botoes = ""; // OS BOTÕES ACOMPANHAR/CRIAR CHAMADO FICARÃO TEMPORARIAMENTE AQUI
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }
  render() {
    return (
      <div
        id="botoes"
        style={{
          opacity: this.state.animate ? 1 : 0
        }}
      >
        <button className="criar">Criar Chamado</button>
        <button className="acompanhar" onClick={this.buscaChamado}>
          Acompanhar Chamado
        </button>
      </div>
    );
  }
  buscaChamado = () => {
    this.props.onKeyDown("Buscar");
    // let botoesEl = document.getElementById("botoes");
    // ReactDOM.unmountComponentAtNode(botoesEl);
    // ReactDOM.render(<BuscarChamado onKeyDown={this.listenEsc} />, botoesEl);
  };
}
