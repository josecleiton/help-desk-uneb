import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextArea from '../../../TextArea';
import AtendimentoTombamento from './Tombamento';

import './style.css';

/*
  CLASS NÃO FINALIZADA PORQUE FALTA BACKEND,
  TRATAR: FAZER LOCK NO CHAMADO ASSIM QUE ALGUÉM CLICAR NELE NA TABELA DE
  CHAMADOS EM ABERTO
*/

export default class AtendimentoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tombamento: '',
    };
  }

  handleSubmit = (el) => {
    const { tombamento } = this.state;
    const formData = [];
    el.preventDefault();
    const textAreaEl = document.querySelector('div.admin-chamado-textarea textarea');
    const selectEl = document.querySelector('select.admin-chamado');
    const selectedOptionVal = selectEl.options[selectEl.selectedIndex].value;
    formData.push(textAreaEl.value, selectedOptionVal);
    // formData.push(selectedOptionVal);
    if (tombamento) {
      const textAreaTombamento = document.querySelector('div.atendimento-tombamento textarea')
        .value;
      formData.push(textAreaTombamento);
    }
    console.log('Dados do formulário: ', formData);
  };

  handleTombamento = (el) => {
    const {
      target: { checked: checkBoxEl },
    } = el;
    if (checkBoxEl) {
      this.setState({ tombamento: <AtendimentoTombamento /> });
    } else {
      this.setState({ tombamento: '' });
    }
  };

  render() {
    const { chamadoId } = this.props;
    const { tombamento } = this.state;
    return (
      <div>
        <h1 className="admin-chamado">
Atendimento #
          {chamadoId}
        </h1>
        <form onSubmit={this.handleSubmit} className="admin-chamado">
          <div className="admin-chamado-textarea">
            <TextArea
              placeholder={`Informações adicionais sobre o chamado #${chamadoId}`}
              style={{ width: '100%', marginBottom: '10px' }}
            />
          </div>
          <div className="admin-chamado-input">
            <label htmlFor="tombamento">
              Tombamento de Patrimônio
              <input type="checkbox" id="tombamento" onClick={this.handleTombamento} />
              <span className="label-checkbox" />
            </label>
            <div id="admin-chamado-tombamento">{tombamento}</div>
          </div>
          <div className="admin-chamado-input">
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
