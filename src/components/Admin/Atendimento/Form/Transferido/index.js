import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../../../../services/api';

import AtendimentoOption from '../../Option';
import ErrorAlert from '../../../../ErrorAlert';

export default class AtendimentoFormTransferido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendente: true,
      error: '',
      success: '',
    };
  }

  handlePendente = (checked) => {
    this.setState({ pendente: !checked });
  };

  handleSubmit = (el) => {
    const { pendente } = this.state;
    el.preventDefault();
    const formData = {
      id: this.props.payload.id,
      situacao: 'Pendente',
      nova_situacao: 'Em Atendimento',
    };
    if (pendente) {
      this.setState({ error: 'Verifique o campo "Recursos chegaram"' });
    } else {
      api
        .post('/api/chamado/update.php', formData)
        .then((res) => {
          // console.log(res);
          if (!res.data.error) {
            this.setState({ success: res.data.mensagem, error: '' }, () => {
              const { history } = this.props;
              setTimeout(() => {
                history.push('/admin');
              }, 1000);
            });
          } else {
            this.setState({ error: res.data.mensagem });
          }
        })
        .catch((error) => {
          // console.log(error);
          this.setState({ error: 'Erro no Servidor' });
        });
    }
  };

  render() {
    const {
      payload: { id },
    } = this.props;
    const { error, success } = this.state;
    return (
      <div className="admin-chamador-wrapper">
        <h1 className="admin-chamado">
Atendimento #
          {id}
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
        {error && <ErrorAlert className="error-atendimento-form">{error}</ErrorAlert>}
        {success && <ErrorAlert className="success">{success}</ErrorAlert>}
      </div>
    );
  }
}

AtendimentoFormTransferido.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
