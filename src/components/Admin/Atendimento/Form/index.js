import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    case 'Em Aberto':
      return <AtendimentoFormEmAberto history={props.history} />;
    case 'Em Atendimento':
      return <AtendimentoFormEmAtendimento history={props.history} />;
    case 'Pendente':
      return <AtendimentoFormPendente history={props.history} />;
    default:
      return <Redirect to="/admin" />;
  }
};

AtendimentoForm.propTypes = {
  estado: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(AtendimentoForm);
