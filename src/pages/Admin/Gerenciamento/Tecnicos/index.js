/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import api from '../../../../services/api';

import AdminRightDiv from '../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../components/Admin/Title';
// import Deck from '../../../../components/Admin/Deck';
import AdminGerenciamentoForm from '../../../../components/Admin/Gerenciamento/Form';
import Table from '../../../../components/Table';
import TableContext from '../../../../components/Table/Context';
import ErrorAlert from '../../../../components/ErrorAlert';

export default class GerenciamentoTecnicos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      tecnicos: null,
    };
  }

  componentDidMount() {
    const jwtToken = localStorage.getItem('HD7-AuthToken');
    api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    api
      .post('/api/tecnico/read.php')
      .then((res) => {
        // console.log(res.data);
        if (!res.data.error) {
          this.setState({ tecnicos: res.data });
        } else {
          this.setState({ error: res.data.mensagem });
        }
      })
      .catch(() => {
        this.setState({ error: 'Erro no servidor.' });
      });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target); // ???
  };

  render() {
    const { tecnicos, error } = this.state;
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

        {/* <Deck
          cards={[
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
          ]}
        /> */}
        {!error ? (
          tecnicos ? (
            <TableContext.Provider value={{}}>
              <Table
                title="Técnicos"
                head={['Login', 'Nome', 'Email', 'Cargo', 'Telefone', 'Setor']}
                columnSortKey={0}
                rows={tecnicos.map((tecnico) => {
                  const {
                    login, nome, email, cargo, telefone, setor,
                  } = tecnico;
                  return [
                    login,
                    nome,
                    email,
                    cargo,
                    telefone,
                    setor ? setor.nome : 'Não especificado',
                    tecnico,
                  ];
                })}
                margin="2% auto"
              />
            </TableContext.Provider>
          ) : (
            <div>Loading...</div>
          )
        ) : (
          <ErrorAlert>{error}</ErrorAlert>
        )}
      </AdminRightDiv>
    );
  }
}
