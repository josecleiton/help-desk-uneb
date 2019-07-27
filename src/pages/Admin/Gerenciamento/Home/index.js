import React from 'react';
import { Link } from 'react-router-dom';

import AdminRightDiv from '../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../components/Admin/Title';

import './style.css';

const GerenciamentoHome = () => (
  <AdminRightDiv>
    <AdminPageTitle comment="faça uma seleção">Gerenciamento</AdminPageTitle>
    <div className="admin-gerenciamento">
      <ul>
        <Link to="/admin/gerenciamento/chamados">
          <li>Chamados</li>
        </Link>
        <Link to="/admin/gerenciamento/tecnicos">
          <li>Técnicos</li>
        </Link>
        <Link to="/admin/gerenciamento/setores">
          <li>Setores</li>
        </Link>
      </ul>
    </div>
  </AdminRightDiv>
);

export default GerenciamentoHome;
