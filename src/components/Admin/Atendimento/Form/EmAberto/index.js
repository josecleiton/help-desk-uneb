import React, { Component } from 'react';

import AtendimentoContext from '../../Context';
import AtendimentoOption from '../../Option';
import TextArea from '../../../../TextArea';
import AtendimentoTombamento from '../Tombamento';
import AtendimentoEncaminhar from '../Encaminhar';
import ErrorAlert from '../../../../ErrorAlert';

/*
  CLASS NÃO FINALIZADA PORQUE FALTA BACKEND,
  TRATAR: FAZER LOCK NO CHAMADO ASSIM QUE ALGUÉM CLICAR NELE NA TABELA DE
  CHAMADOS EM ABERTO
*/

export default class AtendimentoFormEmAberto extends Component {
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

  handleTombamento = (checked) => {
    this.setState({ tombamento: checked });
  };

  handleEncaminhar = (checked) => {
    this.setState({ encaminhar: checked });
  };

  render() {
    const { encaminhar, error } = this.state;
    return (
      <AtendimentoContext.Consumer>
        {(state) => {
          const { id: chamadoId } = state;
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
                <AtendimentoOption
                  name="encaminhar"
                  title="Encaminhar"
                  handle={this.handleEncaminhar}
                />

                {!encaminhar ? (
                  <>
                    <AtendimentoOption
                      name="tombamento"
                      title="Tombamento de Patrimônio"
                      handle={this.handleTombamento}
                    >
                      <AtendimentoTombamento />
                    </AtendimentoOption>
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
        }}
      </AtendimentoContext.Consumer>
    );
  }
}
