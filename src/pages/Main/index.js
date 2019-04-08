import React, { Component } from "react";
import Login from "../../components/Login";
//import ReactDOM from "react-dom";
import "./style.css";
import logo from "../../logo.png";

export default class Main extends Component {
  render() {
    return (
      <div id="main-page">
        <header id="bar">
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
          <div id="tecnicos">
            <i class="fas fa-info-circle" />
            {/*
              DIV PARA MOSTRAR STATUS:
                TECNICOS ONLINE OU HORARIO DE FUNCIONAMENTO
            */}
            Técnicos online: {}
          </div>
          <div id="area-tecnico">
            <i class="fas fa-user" />
            Área dos Técnicos
            <Login />
          </div>
        </header>
        <div id="container">
          <div id="logo">
            <img src={logo} alt="" className="App-logo" />
          </div>

          <form className="checar-chamado">
            <input
              placeholder="Insira seu email ou o número do chamado..."
              name="input"
              id=""
            />
          </form>
          <div className="error">
            Digite um email valido ou um número de chamado!
          </div>
        </div>
      </div>
    );
  }
  formChecker = () => {
    let inputVal = document
      .querySelector("input[name=input]")
      .value.toLowerCase();
    let errorEl = document.getElementsByClassName("error")[0];
    if (inputVal.indexOf("@") === -1) {
      let numberRegex = /[0-9]/;
      if (!numberRegex.test(inputVal) || inputVal.length > 6) {
        errorEl.style.display = "flex";
        errorEl.style.justifyContent = "center";
        errorEl.style.justifyItems = "center";
        errorEl.style.margin = "auto";
      }
    } else {
      errorEl.style.display = "none";
    }
    // TESTAR NO SERVER SE É UM EMAIL VALIDO
  };
}
