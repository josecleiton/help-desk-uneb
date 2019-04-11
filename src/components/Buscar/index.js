import React, { Component } from "react";
import "./style.css";

export default class BuscarChamado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false,
      esc: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }
  render() {
    return (
      <div>
        <form onKeyDown={this.listenEsc} onSubmit={this.formChecker}>
          <input
            placeholder="Insira seu email ou o número do chamado..."
            name="input"
            style={{
              width: this.state.animate ? "75%" : "15%"
            }}
            required
          />
        </form>
        <div className="erro" />
      </div>
    );
  }
  formChecker = formObject => {
    formObject.preventDefault();
    let inputEl = String(document.querySelector("input[name=input]").value);
    if (inputEl.indexOf("@") === -1) {
      let numberReg = /[0-9]/;
      if (inputEl.length > 7 || !numberReg.test(inputEl)) {
        let errorEl = document.getElementsByClassName("erro")[0];
        errorEl.style.display = "block";
        errorEl.innerHTML = "Digite um email ou um número de chamada válido!";
      }
    }
  };
  listenEsc = evt => {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = evt.key === "Escape" || evt.key === "Esc";
    } else {
      isEscape = evt.keyCode === 27;
    }
    this.props.onKeyDown(isEscape ? "Esc" : "");
  };
}
