import React, { Component } from "react";
import "./style.css";
import logo from "../../logo.png";

export default class Main extends Component {
  render() {
    return (
      <div id="main-page">
        <header id="bar">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
        </header>
        <div id="container">
          <div id="logo">
            <img src={logo} alt="" className="App-logo" />
          </div>

          <form action="" method="get" className="checar-chamado">
            <input
              placeholder="Insira seu email ou o número do chamado..."
              type="text"
              name=""
              id=""
            />
            <button type="submit"> Verificar </button>
          </form>
        </div>
      </div>
    );
  }
}
