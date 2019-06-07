import React, { Component } from 'react';

import AtendimentoContext from '../../Context';
import AtendimentoOption from '../../Option';

export default class AtendimentoFormPendente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendente: true,
    };
  }

  handlePendente = (checked) => {
    this.setState({ pendente: !checked });
  };

  handleSubmit = (el) => {
    const { pendente } = this.state;
    el.preventDefault();
    !pendente ? console.log('Pendente:', el) : console.log('Fail');
  };

  render() {
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
                <AtendimentoOption
                  name="pendente"
                  title="Recursos chegaram"
                  handle={this.handlePendente}
                />
                <div className="admin-chamado-input">
                  <button type="submit" className="admin-chamado">
                    Atender
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
