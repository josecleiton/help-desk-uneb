import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextArea from '../../../TextArea';
import AtendimentoTombamento from './Tombamento';
import AtendimentoEncaminhar from './Encaminhar';

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
      tombamento: false,
      encaminhar: false,
    };
  }

  handleSubmit = (el) => {
    const { tombamento, encaminhar } = this.state;
    const formData = [];
    el.preventDefault();
    if (!encaminhar) {
      const textAreaEl = document.querySelector('div.admin-chamado-textarea textarea');
      const selectEl = document.querySelector('select.admin-chamado');
      const selectedOptionVal = selectEl.options[selectEl.selectedIndex].value;
      formData.push(textAreaEl.value, selectedOptionVal);
      if (tombamento) {
        const textAreaTombamento = document.querySelector('div.atendimento-tombamento textarea')
          .value;
        formData.push(textAreaTombamento);
      }
    } else {
      const selectEl = document.querySelector('select.admin-chamado');
      const selectedOptionVal = selectEl.options[selectEl.selectedIndex].value;
      formData.push(selectedOptionVal);
    }
    console.log('Dados do formulário: ', formData);
  };

  handleTombamento = (el) => {
    const {
      target: { checked: checkBoxEl },
    } = el;
    this.setState({ tombamento: checkBoxEl });
  };

  handleEncaminhar = (el) => {
    const {
      target: { checked: checkBoxEl },
    } = el;
    this.setState({ encaminhar: checkBoxEl });
  };

  render() {
    const { chamadoId } = this.props;
    const { tombamento, encaminhar } = this.state;
    return (
      <div>
        <h1 className="admin-chamado">
Atendimento #
          {chamadoId}
        </h1>
        <form onSubmit={this.handleSubmit} className="admin-chamado">
          {!encaminhar && (
            <div className="admin-chamado-textarea">
              <TextArea
                placeholder={`Informações adicionais sobre o chamado #${chamadoId}`}
                style={{ width: '100%', marginBottom: '10px' }}
              />
            </div>
          )}
          <div className="admin-chamado-input">
            <label htmlFor="encaminhar" role="button">
              Encaminhar
              <input type="checkbox" id="encaminhar" onClick={this.handleEncaminhar} />
              <span className="label-checkbox" />
            </label>
          </div>
          {!encaminhar ? (
            <>
              <div className="admin-chamado-input">
                <label htmlFor="tombamento" role="button">
                  Tombamento de Patrimônio
                  <input type="checkbox" id="tombamento" onClick={this.handleTombamento} />
                  <span className="label-checkbox" />
                </label>
                <div id="admin-chamado-tombamento">{tombamento && <AtendimentoTombamento />}</div>
              </div>
              <div className="admin-chamado-input">
                <strong>Prioridade</strong>
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
            </>
          ) : (
            <div className="admin-chamado-input">
              <AtendimentoEncaminhar />
              <button type="submit" className="admin-chamado">
                Encaminhar
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

AtendimentoForm.propTypes = {
  chamadoId: PropTypes.string.isRequired,
};
