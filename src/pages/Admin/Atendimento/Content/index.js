import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HistoricoMovimentacao from '../../../../components/HistoricoChamado';
import api from '../../../../services/api';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      information: null,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    api
      .post('/api/chamado/called', { id })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(window.location.href);
    const { information } = this.state;
    console.log(information);
    return (
      <div className="admin-atendimento-content">
        <h2>Número do Chamado: #</h2>
        <p>
          <strong>Solicitante:</strong>
          {' '}
user@email.com
        </p>
        <p>
          <strong>Status:</strong>
          {' '}
Aberto
        </p>
        <p>
          <strong>Data de Abertura:</strong>
          {' '}
dd/mm/YYYY
        </p>

        <p>
          <strong>Área:</strong>
          {' '}
TI
        </p>

        <p>
          <strong>Anexo:</strong>
          {' '}
Ver imagem
        </p>
        <HistoricoMovimentacao>Tabela de modificações vem aqui</HistoricoMovimentacao>
      </div>
    );
  }
}
Content.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Content;
