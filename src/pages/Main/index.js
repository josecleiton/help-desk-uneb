import React, { Component } from "react";
import Login from "../../components/Login";
import ReactDOM from "react-dom";
import "./style.css";
import logo from "../../logo.png";
import { error } from "util";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      error: ""
    };
  }
  render() {
    return (
      <div id="main-page">
        <header id="bar">
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
          <nav className="menu">
            <ul>
              <li><i class="fas fa-info-circle" />Status do Sistema: ON</li>
              <li><i class="fas fa-user" />Login <Login></Login></li>
            </ul>
          </nav>
        </header>
        <div id="container">
          <img src={logo} alt="" className="App-logo" />
          <div className="button">
            <button className="criar">Criar Chamado</button>
            <button className="acompanhar">Acompanhar Chamado</button>
          </div>
          {/*
          <form className="checar-chamado" onSubmit={this.formChecker}>
            <input
              placeholder="Insira seu email ou o número do chamado..."
              name="input"
              id=""
              required
            />
          </form>
          <div className="erro">{this.state.error}</div>
          */}

        </div>
        <footer className="rodape">
          <h3>Diretrizes  de Uso</h3>
          <h3>Quem somos</h3>
          <h3>Sugestões</h3>
          <h3></h3>
          <img src={logo} alt="" />
        </footer>
      </div >

    );
  }
  formChecker = () => {
    let inputEl = String(document.querySelector('input[name=input]').value);
    if (inputEl.indexOf('@') === -1) {
      let numberReg = /[0-9]/
      if (inputEl.length > 7 || !numberReg.test(inputEl)) {
        document.getElementsByClassName('erro')[0].style.display = 'block';
        let erroMsg = "Digite um email ou um número de chamada válido!"
        this.setState({ error: erroMsg })
        return false;
      }
    }
    return true;
  }
}
