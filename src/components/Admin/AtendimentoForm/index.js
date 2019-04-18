import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

/*
  CLASS NÃO FINALIZADA PORQUE FALTA BACKEND,
  TRATAR: FAZER LOCK NO CHAMADO ASSIM QUE ALGUÉM CLICAR NELE NA TABELA DE
  CHAMADOS EM ABERTO
*/

export default class AtendimentoForm extends Component {
  handleSubmit = (el) => {
    el.preventDefault();
    const textAreaEl = document.querySelector('textarea.admin-chamado');
    const selectEl = document.querySelector('select.admin-chamado');
    const selectedOptionVal = selectEl.options[selectEl.selectedIndex].value;
    console.log('Informações adicionais: ', textAreaEl.value);
    console.log('Prioridade selecionada: ', selectedOptionVal);
  };

  render() {
    const { chamadoId } = this.props;
    return (
      <div>
        <h1 className="admin-chamado">Atendimento</h1>
        <form onSubmit={this.handleSubmit} className="admin-chamado">
          <div>
            <textarea
              className="admin-chamado"
              placeholder={`Informações adicionais sobre o chamado #${chamadoId}`}
            />
          </div>
          <div style={{ marginLeft: '20px' }}>
            Prioridade
            <select name="prioridade" className="admin-chamado">
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
              <option value="urgente">Urgente</option>
            </select>
            <button type="submit" className="admin-chamado">
              Atender
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AtendimentoForm.propTypes = {
  chamadoId: PropTypes.string.isRequired,
};
