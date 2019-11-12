import React, { Component } from 'react';
import api from '../../../services/api';
import Table from '../../../components/Table';
import TableContext from '../../../components/Table/Context';
import AdminPageTitle from '../../../components/Admin/Title';
import AdminRightDiv from '../../../components/Admin/RightDiv';
import AdminGerenciamentoForm from '../../../components/Admin/Gerenciamento/Form';

export default class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chamado: [],
      result: null,
    };
  }

  componentDidMount() {
    api
      .get('/api/chamados')
      .then((res) => {
        // console.log(res.data);
        this.setState({ chamado: res.data, result: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchCalled = (called) => {
    console.log(called);
    const { chamado } = this.state;

    if (called) {
      alert('Chamado atribuído com sucesso !');
      this.setState({ result: null });
      this.setState({ result: called });
    } else {
      this.setState({ result: null });
      this.setState({ result: chamado });
    }
  };

  render() {
    const { result, chamado } = this.state;
    const OpenedCalled = chamado.filter(called => called.tecnico.length === 0);
    console.log(chamado);

    return (
      <AdminRightDiv>
        <AdminPageTitle comment="Painel Administrativo">HD7</AdminPageTitle>
        <TableContext.Provider value={{ goToUrl: '/admin/atendimento', rowsPrimaryKey: 0 }}>
          <AdminGerenciamentoForm
            handleClick={called => this.searchCalled(called)}
            url="atenderChamado"
            ButtonText="Atender Chamado"
            buttonChildren={[
              <>
                Atender Chamado Aberto
                {' '}
                <i className="fas fa-plus" />
              </>,
              <>
                Preencha os campos
                {' '}
                <i className="fas fa-arrow-down" />
              </>,
            ]}
            inputForm={[
              {
                label: 'Login',
                id: 'login',
                nome: 'login',
                tipo: 'text',
                placeholder: 'Informe seu login',
              },
              {
                label: 'Senha',
                id: 'senha',
                nome: 'senha',
                tipo: 'password',
                placeholder: 'Informe sua senha',
              },
            ]}
            selectForm={[
              {
                label: 'Atender Chamado:',
                id: 'id_chamado',
                nome: 'id_chamado',
                option: OpenedCalled.map(called => ({
                  nome: `CHAMADO: ${called.id} - PROBLEMA: ${called.descricao}`,
                  value: called.id,
                })),
              },
            ]}
          />
          {result && (
            <Table
              title="Chamados Abertos"
              margin="1.5% auto"
              columnSortKey={5}
              dateFields={[6]}
              head={[
                '#',
                'Área',
                'Situação',
                'Problema',
                'Qtd de dias',
                'Data de Abertura',
                'Solicitante',
              ]}
              maxRowsPerPage={10}
              rows={OpenedCalled.map(value => [
                value.id,
                value.setor.map(nomeSetor => nomeSetor.nome),
                value.situacao,
                value.descricao,
                value.QtdDias,
                value.data,
                value.usuario.map(nomeUser => nomeUser.nome),
              ])}
            />
          )}
        </TableContext.Provider>
      </AdminRightDiv>
    );
  }
}
