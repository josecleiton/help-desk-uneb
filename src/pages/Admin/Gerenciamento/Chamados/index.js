import React, { Component } from 'react';
import AdminRightDiv from '../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../components/Admin/Title';
import AdminGerenciamentoForm from '../../../../components/Admin/Gerenciamento/Form';
import api from '../../../../services/api';

export default class GerenciamentoChamados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setor: [],
    };
  }

  componentDidMount() {
    api
      .get('/api/setor/read')
      .then((res) => {
        // console.log(res.data);
        this.setState({ setor: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchCalled = (called) => {
    console.log(called);
    const { setor } = this.state;

    if (called) {
      alert('Chamado atribuído com sucesso !');
      this.setState({ result: null });
      this.setState({ result: called });
    } else {
      this.setState({ result: null });
      this.setState({ result: setor });
    }
  };

  render() {
    const { setor } = this.state;
    return (
      <AdminRightDiv>
        <AdminPageTitle comment="comentário"> Chamados</AdminPageTitle>
        <AdminGerenciamentoForm
          handleClick={called => this.searchCalled(called)}
          url="cadastrarProblema"
          ButtonText="Cadastrar"
          buttonChildren={[
            <>
              Cadastrar problema
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
              label: 'Descrição do problema',
              id: 'descricao',
              nome: 'descricao',
              tipo: 'text',
              placeholder: 'Informe o dado do problema',
            },
          ]}
          selectForm={[
            {
              label: 'Setor do problema:',
              id: 'setor',
              nome: 'setor',
              option: setor.map(called => ({
                nome: called.nome,
                value: called.nome,
              })),
            },
          ]}
        />

        <AdminGerenciamentoForm
          handleSubmit={this.handleFormSubmit}
          url="removerProblema"
          ButtonText="remover"
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
