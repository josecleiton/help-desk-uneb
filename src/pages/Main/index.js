import React, { Component } from "react";
import ReactDOM from "react-dom";

import Header from "../../components/Header";
import BotoesMain from "../../components/BotoesMain";
import BuscarChamado from "../../components/Buscar";

import "./style.css";
import logo from "../../logo.png";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      buscar: ""
    };
  }
  componentDidMount() {
    this.botoesEl = document.getElementById("area-busca");
    // console.log(this.botoesEl);
    ReactDOM.render(<BotoesMain onKeyDown={this.listenEsc} />, this.botoesEl);
  }
  render() {
    return (
      <div id="main-page">
        <Header />
        <div id="container">
          <img src={logo} alt="" className="App-logo" />
          <div id="area-busca" />
        </div>
        <footer className="rodape">
          <h3>Diretrizes de Uso</h3>
          <h3>Quem somos</h3>
          <h3>Sugestões</h3>
          <img src={logo} alt="" />
        </footer>
      </div>
    );
  }
  componentDidUpdate(prevProps, prevStates) {
    switch (this.state.buscar) {
      case "Esc":
        ReactDOM.unmountComponentAtNode(this.botoesEl);
        ReactDOM.render(
          <BotoesMain onKeyDown={this.listenEsc} />,
          this.botoesEl
        );
        break;
      case "Buscar":
        ReactDOM.unmountComponentAtNode(this.botoesEl);
        ReactDOM.render(
          <BuscarChamado onKeyDown={this.listenEsc} />,
          this.botoesEl
        );

        break;
      default:
        break;
    }
    /*
    if (this.state.esc) {
      var botoesEl = document.getElementById("botoes");
      ReactDOM.unmountComponentAtNode(botoesEl);
      botoesEl.style.opacity = 0;
      botoesEl.style.transition = "all 10s";
      setTimeout(() => {
        botoesEl.innerHTML = this.botoes;
        console.log(this.botoes);
      }, 100);
      setTimeout(() => {
        botoesEl.style.opacity = 1;
        console.log(botoesEl.style);
        this.setState({ esc: false });
      }, 200);
    }*/
  }
  listenEsc = esc => {
    this.setState({ buscar: esc });
  };
}
