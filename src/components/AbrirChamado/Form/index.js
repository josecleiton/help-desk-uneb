import React, { Component } from 'react';
import './style.css';

export default class AbrirChamadoForm extends Component {
  render() {
    return (
      <div className="formulario">
        <form>
          <div className="item-title">
            <h2>ABERTURA DE CHAMADO</h2>
          </div>
          <div className="item">
            <label>SOLICITANTE</label>
            <input type="text" placeholder="nome completo" />
          </div>
          <div className="item">
            <label>TELEFONE</label>
            <input type="tel" placeholder="Telefone Válido" min="8" max="9" />
          </div>
          <div className="item">
            <label>EMAIL</label>
            <input type="email" placeholder="Email Válido" />
          </div>
          <div className="item">
            <label>DEFEITO</label>
            <select>
              <option value="001">OUTRO</option>
            </select>
            <label>IMAGEM DO DEFEITO</label>
            <input type="file" />
          </div>
          <div className="item">
            <label>DESCRIÇÃO</label>
            <textarea name="" cols="30" rows="10" />
          </div>
          <div className="item-submit">
            <input type="submit" value="ENVIAR CHAMADO" />
          </div>
        </form>
      </div>
    );
  }
}
