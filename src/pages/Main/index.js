import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from '../../components/Header';
import MenuChamado from '../../components/MenuChamado';
import BuscarChamado from '../../components/BuscarChamado';

import './style.css';
import logo from '../../logo.png';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buscar: '',
    };
  }

  componentDidMount() {
    this.botoesEl = document.getElementById('area-busca');
    // console.log(this.botoesEl);
    ReactDOM.render(<MenuChamado onKeyDown={this.listenEsc} />, this.botoesEl);
  }

  componentDidUpdate() {
    const { buscar } = this.state;
    switch (buscar) {
      case 'Esc':
        ReactDOM.unmountComponentAtNode(this.botoesEl);
        setTimeout(() => {
          ReactDOM.render(<MenuChamado onKeyDown={this.listenEsc} />, this.botoesEl);
        }, 100);
        break;
      case 'Buscar':
        ReactDOM.unmountComponentAtNode(this.botoesEl);
        setTimeout(() => {
          ReactDOM.render(<BuscarChamado onKeyDown={this.listenEsc} />, this.botoesEl);
        }, 100);

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
    } */
  }

  listenEsc = (esc) => {
    this.setState({ buscar: esc });
  };

  render() {
    return (
      <div id="main-page">
        <Header />
        <div className="wrapper">
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
}
