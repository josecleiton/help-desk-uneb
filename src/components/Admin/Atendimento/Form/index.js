import React from 'react';

import AtendimentoFormEmAberto from './EmAberto';
import AtendimentoFormEmAtendimento from './EmAtendimento';
import AtendimentoFormPendente from './Pendente';
import './style.css';

/**
 *
 * Acessar o banco e entrar no switch a partir do estado do chamado
 */

const AtendimentoForm = (props) => {
  switch (props.estado) {
    case 'Em aberto':
      return <AtendimentoFormEmAberto />;
    case 'Em atendimento':
      return <AtendimentoFormEmAtendimento />;
    case 'Pendente':
      return <AtendimentoFormPendente />;
    default:
      return <AtendimentoFormEmAberto />;
  }
};

export default AtendimentoForm;
