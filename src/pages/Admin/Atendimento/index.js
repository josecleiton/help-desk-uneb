import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AdminRightDiv from '../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../components/Admin/Title';
import AtendimentoContext from '../../../components/Admin/Atendimento/Context';
import LargeBox from '../../../components/LargeBox';
import AtendimentoForm from '../../../components/Admin/Atendimento/Form';
import Content from './Content';
import Error from '../../../components/Error';

import './style.css';

/**
 * Página incompleta.
 * Função a ser implementada:
 * Acessar o banco de dados e selecionar o estado atual do chamado
 * A partir desse estado, chamar o form correspondente
 */

export default class Atendimento extends Component {
  constructor(props) {
    super(props);
    const {
      location: { state },
    } = props;
    this.state = { validAccess: state !== undefined };
  }

  currentPath = () => {
    const {
      match: { path },
    } = this.props;
    return path.substr(0, path.lastIndexOf('/'));
  };

  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { validAccess } = this.state;
    return (
      <AdminRightDiv>
        {validAccess ? (
          <AtendimentoContext.Provider value={{ id }}>
            <AdminPageTitle>Atendimento de Chamado</AdminPageTitle>
            <AtendimentoForm estado="Em aberto" />
            <LargeBox className="admin-atendimento-box-clicked">
              <Content id={id} />
            </LargeBox>
          </AtendimentoContext.Provider>
        ) : (
          <Error icon="far fa-dizzy" title="Acesso não é permitido">
            O acesso direto a essa página não é permitido, retorne ao início pelo menu ou
            {' '}
            <Link to="/admin">clicando aqui</Link>
.
          </Error>
        )}
      </AdminRightDiv>
    );
  }
}

Atendimento.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
