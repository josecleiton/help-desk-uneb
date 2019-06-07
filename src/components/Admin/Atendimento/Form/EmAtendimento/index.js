import React, { Component } from 'react';

import AtendimentoContext from '../../Context';
import AtendimentoOption from '../../Option';
import TextArea from '../../../../TextArea';

export default class AtendimentoFormEmAtendimento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encaminhar: false,
      pendente: false,
      concluido: false,
    };
  }

  handleEncaminhar = (checked) => {
    this.setState({ encaminhar: checked });
  };

  handlePendente = (checked) => {
    this.setState({ pendente: checked });
  };

  handleConcluido = (checked) => {
    this.setState({ concluido: checked });
  };

  handleSubmit = (el) => {
    el.preventDefault();
    const { encaminhar, pendente, concluido } = this.state;
    const textArea = document.querySelector('textarea');
    if (encaminhar) {
      console.log('Encaminhar:', textArea.value);
    } else if (pendente) {
      console.log('Pendente:', textArea.value);
    } else if (concluido) {
      console.log('Concluido!', textArea.value);
    }
  };

  render() {
    const { encaminhar, pendente, concluido } = this.state;
    return (
      <AtendimentoContext.Consumer>
        {(state) => {
          const { id: chamadoId } = state;
          return (
            <div className="admin-chamador-wrapper">
              <h1 className="admin-chamado">
Atendimento #
                {chamadoId}
              </h1>
              <form onSubmit={this.handleSubmit} className="admin-chamado">
                {!pendente && !concluido && (
                  <>
                    <AtendimentoOption
                      name="encaminhar"
                      title="Encaminhar"
                      handle={this.handleEncaminhar}
                    />
                    {encaminhar && (
                      <TextArea
                        placeholder="Insira informações que possam auxiliar na resolução do chamado."
                        style={{ width: '100%' }}
                      />
                    )}
                  </>
                )}
                {!concluido && !encaminhar && (
                  <>
                    <AtendimentoOption
                      name="pendente"
                      title="Falta recurso"
                      handle={this.handlePendente}
                    />
                    {pendente && (
                      <TextArea
                        placeholder="Insira quais recursos faltam para a resolução do chamado."
                        required
                        style={{ width: '100%' }}
                      />
                    )}
                  </>
                )}
                {!pendente && !encaminhar && (
                  <>
                    <AtendimentoOption
                      name="concluir"
                      title="Concluir chamado"
                      handle={this.handleConcluido}
                    />
                    {concluido && (
                      <TextArea
                        placeholder="Insira notas pertinentes acerca do problema resolvido"
                        required
                        style={{ width: '100%' }}
                      />
                    )}
                  </>
                )}
                <div className="admin-chamado-input">
                  <button type="submit" className="admin-chamado">
                    {!concluido ? 'Atender' : 'Concluir'}
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </AtendimentoContext.Consumer>
    );
  }
}
