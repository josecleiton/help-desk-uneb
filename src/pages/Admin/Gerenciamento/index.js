import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AdminPageTitle from '../../../components/Admin/Title';
import AdminMenu from '../../../components/Admin/Menu';
import AdminRightDiv from '../../../components/Admin/RightDiv';

import GerenciamentoAreas from './Areas';
import GerenciamentoChamados from './Chamados';
import GerenciamentoTecnicos from './Tecnicos';

import './style.css';

const Home = () => (
  <Fragment>
    <AdminPageTitle comment="faça uma seleção">Gerenciamento</AdminPageTitle>
    <div className="admin-gerenciamento">
      <ul>
        <Link to="/admin/gerenciamento/areas">
          <li>Áreas</li>
        </Link>
        <Link to="/admin/gerenciamento/chamados">
          <li>Chamados</li>
        </Link>
        <Link to="/admin/gerenciamento/tecnicos">
          <li>Técnicos</li>
        </Link>
      </ul>
    </div>
  </Fragment>
);

const Gerenciamento = (props) => {
  const {
    match: {
      params: { subpage },
    },
  } = props;
  let componentToRender = null;
  switch (subpage) {
    case 'areas':
      componentToRender = <GerenciamentoAreas />;
      break;
    case 'chamados':
      componentToRender = <GerenciamentoChamados />;
      break;
    case 'tecnicos':
      componentToRender = <GerenciamentoTecnicos />;
      break;

    default:
      componentToRender = <Home />;
      break;
  }
  return (
    <Fragment>
      <AdminMenu />
      <AdminRightDiv>{componentToRender}</AdminRightDiv>
    </Fragment>
  );
};

Gerenciamento.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Gerenciamento;
