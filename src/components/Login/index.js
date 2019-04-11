// AQUI FICARÁ O CAMPO DE LOGIN
import React, { Component } from "react";
import "./style.css";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      animate: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }
  componentDidUpdate() {
    if (this.state.animate) {
      setTimeout(() => {
        document.getElementById("login-content").style.transition = "all 0.3s";
        document.getElementById("login").style.transition = "all 0.5s";
      }, 200);
    }
  }
  render() {
    return (
      <div
        id="login"
        style={{
          transition: "all 1s",
          height: this.state.animate ? 225 : 0
        }}
      >
        <div
          id="login-content"
          style={{
            opacity: this.state.animate ? 1 : 0,
            transition: "all 2s"
          }}
        >
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
              <a href="#login" className="esqueceu">
                Esqueceu a senha?
              </a>
            </nav>
          </form>
        </div>
      </div>
    );
  }
}
