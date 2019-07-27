import React, { Component } from 'react';
import AdminRightDiv from '../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../components/Admin/Title';
import AdminGerenciamentoForm from '../../../../components/Admin/Gerenciamento/Form';

export default class GerenciamentoChamados extends Component {
  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target); // ???
  };

  render() {
    return (
      <AdminRightDiv>
        <AdminPageTitle comment="comentário"> Chamados</AdminPageTitle>
        <AdminGerenciamentoForm
          handleSubmit={this.handleFormSubmit}
          buttonChildren={[
            <>
              Cadastrar tipo de Chamado
              {' '}
              <i className="fas fa-plus" />
            </>,
            <>
              Preencha todos os campos
              {' '}
              <i className="fas fa-arrow-down" />
            </>,
          ]}
          inputForm={[
            {
              label: 'Descrição',
              id: 'desc',
              tipo: 'text',
              placeholder: 'insira a descrição do problema',
            },
          ]}
          selectForm={[
            {
              label: 'Setor do problema',
              id: 'setor',
              option: [
                {
                  nome: '',
                  value: '',
                },
                {
                  nome: 'Setor A',
                  value: 'sim',
                },
                {
                  nome: 'Setor B',
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
              Remover tipo de Chamado
              {' '}
              <i className="fas fa-plus" />
            </>,
            <>
              Preencha o campo abaixo
              {' '}
              <i className="fas fa-arrow-down" />
            </>,
          ]}
          selectForm={[
            {
              label: 'Selecione o problema a ser removido',
              id: 'setor',
              option: [
                {
                  nome: '',
                  value: '',
                },
                {
                  nome: 'Danilo ',
                  value: '001',
                },
                {
                  nome: 'José',
                  value: '002',
                },
                {
                  nome: 'Você',
                  value: '003',
                },
              ],
            },
          ]}
        />
      </AdminRightDiv>
    );
  }
}
