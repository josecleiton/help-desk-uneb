import React from 'react';
import PropTypes from 'prop-types';
import HistoricoMovimentacao from '../../../../components/HistoricoChamado';

const Content = (props) => {
  const { id } = props;
  return (
    <div className="admin-atendimento-content">
      <h2>
Número do Chamado: #
        {id}
      </h2>
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
        <strong>Setor:</strong>
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
};
Content.propTypes = {
  id: PropTypes.string.isRequired,
};
export default Content;
