import React, { Component } from 'react';
import './style.css';

export default class CriarChamado extends Component {
  constructor() {
    super();
    this.state = {
      animate: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  render() {
    const { animate } = this.state;
    return (
      <div className="setor-chamado" style={{ opacity: animate ? 1 : 0 }}>
        <h2>SETOR DE ATENDIMENTO</h2>
        <div>
          <select name="" id="">
            <option value="RH">RH</option>
            <option value="TI">TI</option>
            <option value="COMUNICACAO">COMUNICAÇÃO </option>
            <option value="ADMINISTRATIVO">ADMINISTRATIVO </option>
            <option value="FINANCEIRO">FINANCEIRO </option>
            <option value="ACADEMICA">ACADÊMICA </option>
          </select>
          <button type="submit">Confirmar</button>
        </div>
      </div>
    );
  }
}

/*

 <div className="container">
        <form action="" className="abrir-chamado">
          <div className="item-title">
            <h2>ABERTURA DE CHAMADO</h2>
          </div>
          <div className="item">
            <label>SOLICITANTE</label>
            <input type="text" name="" placeholder="nome completo" />
          </div>
          <div className="item">
            <label>TELEFONE</label>
            <input type="tel" name="" placeholder="Telefone Válido" min="8" max="9" />
          </div>
          <div className="item">
            <label>EMAIL</label>
            <input type="email" name="" placeholder="Email Válido" />
          </div>
          <div className="item-select">
            <div>
              <label>SETOR</label>
              <select name="">
                <option value="001">DEPARTAMENTO DA PUTARIA D AUNEB </option>
              </select>
            </div>
            <div>
              <label>DEFEITO</label>
              <select name="">
                <option value="001">OUTRO</option>
              </select>
            </div>
            <div>
              <label>IMAGEM DO DEFEITO</label>
              <input type="file" src="" placeholder="Imagem do defeito" />
            </div>
          </div>
          <div className="item">
            <label>DESCRIÇÃO</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div class="item-submit">
            <input type="submit" value="ENVIAR CHAMADO" />
          </div>
        </form>
      </div>
*/
