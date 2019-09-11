import React from 'react';
import propTypes from 'prop-types';
import './style.css';

const HistoricoMovimentacao = (props) => {
  const { children } = props;

  return (
    <>
      <div id="hist-mov">
        <h2>Histórico de Movimentações</h2>
      </div>
      <p>{children}</p>
    </>
  );
};

HistoricoMovimentacao.propTypes = {
  children: propTypes.string.isRequired,
};

export default HistoricoMovimentacao;
