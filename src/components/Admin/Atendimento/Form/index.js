import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextArea from '../../../TextArea';
import AtendimentoTombamento from './Tombamento';
import AtendimentoEncaminhar from './Encaminhar';
import ErrorAlert from '../../../ErrorAlert';

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
      error: '',
    };
  }

  handleSubmit = (el) => {
    const { tombamento, encaminhar } = this.state;
    const formData = {};
    el.preventDefault();
    if (!encaminhar) {
      const textAreaEl = document.querySelector('div.admin-chamado-textarea textarea');
      const priorityEl = document.querySelector('select.admin-chamado');
      const priorityVal = priorityEl.options[priorityEl.selectedIndex].value;
      if (!priorityVal) {
        this.setState({ error: 'Você deve selecionar uma prioridade para este chamado!' });
        return;
      }
      formData.info = textAreaEl.value;
      formData.priority = priorityVal;
      if (tombamento) {
        const textAreaTombamento = document.querySelector('div.atendimento-tombamento textarea')
          .value;
        formData.tombamento = textAreaTombamento;
      }
    } else {
      const encaminharSetorEl = document.querySelector('select.admin-chamado');
      const encaminhaSetorVal = encaminharSetorEl.options[encaminharSetorEl.selectedIndex].value;
      if (!encaminhaSetorVal) {
        this.setState({ error: 'Você deve selecionar um setor para encaminhar este chamado!' });
        return;
      }
      formData.encaminhar = encaminhaSetorVal;
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
    const { tombamento, encaminhar, error } = this.state;
    return (
      <div className="admin-chamado-wrapper">
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
                <select name="priority" className="admin-chamado">
                  <option value="">-------</option>
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
        {error && <ErrorAlert className="error-atendimento-form">{error}</ErrorAlert>}
      </div>
    );
  }
}

AtendimentoForm.propTypes = {
  chamadoId: PropTypes.string.isRequired,
};
