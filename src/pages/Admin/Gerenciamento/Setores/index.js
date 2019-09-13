/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';

import api from '../../../../services/api';

import AdminRightDiv from '../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../components/Admin/Title';
import Deck from '../../../../components/Admin/Deck';
import AdminGerenciamentoForm from '../../../../components/Admin/Gerenciamento/Form';
import './style.css';

export default class GerenciamentoSetores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setores: null,
      error: null,
    };
  }

  componentDidMount() {
    const jwtToken = localStorage.getItem('HD7-AuthToken');
    api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    api.post('/api/setor/read.php').then((res) => {
      // console.log(res.data);
      if (!res.data.error) {
        this.setState({ setores: res.data });
      } else {
        this.setState({ error: res.data.mensagem });
      }
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target); // ???
  };

  render() {
    const { setores, error } = this.state;
    return (
      <AdminRightDiv>
        <AdminPageTitle comment="comentário">Setores</AdminPageTitle>
        <AdminGerenciamentoForm
          handleSubmit={this.handleFormSubmit}
          buttonChildren={[
            <>
              Criar novo setor
              <i className="fas fa-plus" />
            </>,
            <>
              Insira os dados do setor
              <i className="fas fa-arrow-down" />
            </>,
          ]}
          inputForm={[
            {
              label: 'Nome do setor',
              id: 'nome',
              tipo: 'text',
              placeholder: 'insira o nome do setor',
            },
            {
              label: 'Telefone',
              id: 'tele',
              tipo: 'number',
              placeholder: 'Insira o telefone principal do setor',
            },
            {
              label: 'Email',
              id: 'email',
              tipo: 'email',
              placeholder: 'Insira o email do setor',
            },
          ]}
        />

        <AdminGerenciamentoForm
          handleSubmit={this.handleFormSubmit}
          buttonChildren={[
            <>
              Editar Setor
              <i className="fas fa-plus" />
            </>,
            <>
              Porque não editar diretamente no setor escolhido?
              <i className="fas fa-arrow-down" />
            </>,
          ]}
          inputForm={[
            {
              label: 'Nome do setor',
              id: 'nome',
              tipo: 'text',
              placeholder: 'insira o nome do setor',
            },
          ]}
        />

        <AdminGerenciamentoForm
          handleSubmit={this.handleFormSubmit}
          buttonChildren={[
            <>
              Remover Setor
              <i className="fas fa-plus" />
            </>,
            <>
              Insira o nome do Setor
              <i className="fas fa-arrow-down" />
            </>,
          ]}
          inputForm={[
            {
              label: 'Nome do setor',
              id: 'nome',
              tipo: 'text',
              placeholder: 'insira o nome do setor',
            },
          ]}
        />

        {!error ? (
          setores ? (
            <Deck
              cards={setores.map(setor => ({
                info: { title: setor.nome, subTitle: setor.email },
                url: '/admin/gerenciamento/setor',
                payload: setor,
              }))}
            />
          ) : (
            <div>Loading...</div>
          )
        ) : (
          <div>Erro no carregamento dos Setores...</div>
        )}
      </AdminRightDiv>
    );
  }
}
