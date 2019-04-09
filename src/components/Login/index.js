// AQUI FICARÁ O CAMPO DE LOGIN
import React, { Component } from "react";
import "./style.css";
export default class Login extends Component {
  render() {
    return (
      <div id="login">
        <form action="">
          <strong>Área de Login</strong>
          <a href="#login" title="Área de acesso para técnicos.">
            <i className="fas fa-user-tie" />
          </a>
          <br />
          <input
            type="text"
            name="login-lg"
            id=""
            placeholder="Usuário"
            required
          />
          <input type="password" name="login-pw" id="" required />
          <nav>
            <button type="submit" className="login-button">
              Entrar
            </button>
            <a href="http://google.com" className="esqueceu">
              Esqueceu a senha?
            </a>
          </nav>
        </form>
      </div>
    );
  }
}
