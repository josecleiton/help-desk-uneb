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
      chamado: null,
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
      this.setState({ result: null });
      this.setState({ result: called });
    } else {
      this.setState({ result: null });
      this.setState({ result: chamado });
    }
  };

  render() {
    const { result } = this.state;

    return (
      <AdminRightDiv>
        <AdminPageTitle comment="Painel Administrativo">HD7</AdminPageTitle>
        <TableContext.Provider value={{ goToUrl: '/admin/atendimento', rowsPrimaryKey: 0 }}>
          <AdminGerenciamentoForm
            handleClick={called => this.searchCalled(called)}
            url="ChamadoPersonalizado"
            ButtonText="Buscar"
            buttonChildren={[
              <>
                Buscar chamado
                {' '}
                <i className="fas fa-plus" />
              </>,
              <>
                Preencha a busca
                {' '}
                <i className="fas fa-arrow-down" />
              </>,
            ]}
            /* selectForm={[
              {
                label: 'Buscar por:',
                id: 'setor',
                nome: 'select',
                option: [
                  {
                    nome: '',
                    value: '',
                  },
                  {
                    nome: 'Área',
                    value: 'area',
                  },
                  {
                    nome: 'Situação',
                    value: 'situacao',
                  },
                  {
                    nome: 'problema',
                    value: 'problema',
                  },
                  {
                    nome: 'Qtd de dias',
                    value: 'qtd_de_dia',
                  },
                  {
                    nome: 'data de abertura',
                    value: 'data_abertura',
                  },
                  {
                    nome: 'Solicitante',
                    value: 'solicitante',
                  },
                ],
              },
            ]} */
            inputForm={[
              {
                label: 'Número do Chamado',
                id: 'chamado',
                nome: 'id',
                tipo: 'text',
                placeholder: 'Informe o dado do chamado',
              },
            ]}
          />
          {result && (
            <Table
              title="Chamados"
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
              rows={result.map(value => [
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
