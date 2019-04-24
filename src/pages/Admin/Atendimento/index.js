import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AdminRightDiv from '../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../components/Admin/Title';
import LargeBox from '../../../components/LargeBox';
import SortArrow from '../../../components/LargeBox/SortArrow';
import AtendimentoForm from '../../../components/Admin/Atendimento/Form';
import Content from './Content';
import Error from '../../../components/Error';

import './style.css';

const HiddenContent = () => (
  <h3 className="hidden-content-box">
    Descrição do chamado oculta, clique na seta para mais informações.
  </h3>
);

export default class Atendimento extends Component {
  constructor(props) {
    super(props);
    const {
      location: { state },
    } = props;
    this.state = { clicked: false, validAccess: state !== undefined };
  }

  currentPath = () => {
    const {
      match: { path },
    } = this.props;
    return path.substr(0, path.lastIndexOf('/'));
  };

  slide = (clicked) => {
    this.setState({ clicked });
  };

  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { clicked, validAccess } = this.state;
    return (
      <AdminRightDiv>
        {validAccess ? (
          <Fragment>
            <AdminPageTitle>Atendimento de Chamado</AdminPageTitle>
            <LargeBox
              className={clicked ? 'admin-atendimento-box-clicked' : 'admin-atendimento-box'}
            >
              <div className="admin-atendimento-sort-arrow">
                <SortArrow slide={this.slide} />
              </div>
              {clicked ? <Content id={id} /> : <HiddenContent />}
            </LargeBox>
            <AtendimentoForm chamadoId={id} />
          </Fragment>
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
