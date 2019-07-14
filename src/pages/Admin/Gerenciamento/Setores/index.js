import React, { Component } from 'react';

import AdminRightDiv from '../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../components/Admin/Title';
import Deck from '../../../../components/Admin/Deck';
import AdminGerenciamentoForm from '../../../../components/Admin/Gerenciamento/Form';
import './style.css';

export default class GerenciamentoSetores extends Component {
  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  render() {
    return (
      <AdminRightDiv>
        <AdminPageTitle comment="comentário">Setores</AdminPageTitle>
        <AdminGerenciamentoForm
          handleSubmit={this.handleFormSubmit}
          buttonChildren={[
            <>
              Criar novo setor
              {' '}
              <i className="fas fa-plus" />
            </>,
            <>
              Insira os dados do setor
              {' '}
              <i className="fas fa-arrow-down" />
            </>,
          ]}
        />

        <Deck
          cards={[
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
          ]}
        />
      </AdminRightDiv>
    );
  }
}
