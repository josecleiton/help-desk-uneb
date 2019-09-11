import React, { Component } from 'react';
import AdminRightDiv from '../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../components/Admin/Title';
import Deck from '../../../../components/Admin/Deck';
import AdminGerenciamentoForm from '../../../../components/Admin/Gerenciamento/Form';

export default class GerenciamentoTecnicos extends Component {
  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target); // ???
  };

  render() {
    return (
      <AdminRightDiv>
        <AdminPageTitle comment="comentário">Técnico</AdminPageTitle>
        <AdminGerenciamentoForm
          handleSubmit={this.handleFormSubmit}
          buttonChildren={[
            <>
              Cadastrar novo Técnico
              {' '}
              <i className="fas fa-plus" />
            </>,
            <>
              Insira os dados do técnico
              {' '}
              <i className="fas fa-arrow-down" />
            </>,
          ]}
          inputForm={[
            {
              label: 'Nome do técnico',
              id: 'nome',
              tipo: 'text',
              placeholder: 'insira o nome do técnico',
            },
            {
              label: 'Email do técnico',
              id: 'Email',
              tipo: 'email',
              placeholder: 'insira o email do técnico',
            },
            {
              label: 'Setor do técnico',
              id: 'setor',
              tipo: 'text',
              placeholder: 'insira o setor do técnico',
            },
            {
              label: 'Telefone',
              id: 'tele',
              tipo: 'number',
              placeholder: 'Insira o telefone principal do setor',
            },
          ]}
          selectForm={[
            {
              label: 'Técnico Possui privilégios?',
              id: 'nome',
              option: [
                {
                  nome: '',
                  value: '',
                },
                {
                  nome: 'sim',
                  value: 'sim',
                },
                {
                  nome: 'não',
                  value: 'não',
                },
              ],
            },
          ]}
        />
        <AdminGerenciamentoForm
          handleSubmit={this.handleFormSubmit}
          buttonChildren={[
            <>
              Alterar dados do técnico
              <i className="fas fa-plus" />
            </>,
            <>
              Insira o nome do técnico
              <i className="fas fa-arrow-down" />
            </>,
          ]}
          inputForm={[
            {
              label: 'Nome do técnico',
              id: 'nome',
              tipo: 'text',
              placeholder: 'insira o nome do técnico',
            },
          ]}
        />

        <AdminGerenciamentoForm
          handleSubmit={this.handleFormSubmit}
          buttonChildren={[
            <>
              Remover Técnico
              <i className="fas fa-plus" />
            </>,
            <>
              Insira o nome do técnico
              <i className="fas fa-arrow-down" />
            </>,
          ]}
          inputForm={[
            {
              label: 'Nome do técnico',
              id: 'nome',
              tipo: 'text',
              placeholder: 'insira o nome do técnico',
            },
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
