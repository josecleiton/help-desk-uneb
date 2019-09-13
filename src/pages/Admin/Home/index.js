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
    };
  }

  componentDidMount() {
    api
      .get('/api/chamados')
      .then((res) => {
        this.setState({ chamado: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { chamado } = this.state;
    console.log(chamado);
    return (
      <AdminRightDiv>
        <AdminPageTitle comment="Painel Administrativo">HD7</AdminPageTitle>
        <TableContext.Provider value={{ goToUrl: '/admin/atendimento', rowsPrimaryKey: 0 }}>
          <AdminGerenciamentoForm
            handleSubmit={this.handleFormSubmit}
            buttonChildren={[
              <>
                Buscar chamado
                {' '}
                <i className="fas fa-plus" />
              </>,
              <>
                Preencha a busca e a forma de busca
                {' '}
                <i className="fas fa-arrow-down" />
              </>,
            ]}
            selectForm={[
              {
                label: 'Buscar por:',
                id: 'setor',
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
            ]}
            inputForm={[
              {
                label: 'Chamado',
                id: 'chamado',
                tipo: 'text',
                placeholder: 'Informe o dado do chamado',
              },
            ]}
          />
          {chamado && (
            <Table
              title="Chamados"
              margin="1.5% auto"
              columnSortKey={5}
              dateFields={[5]}
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
              rows={chamado.map(value => [
                value.chamado.id,
                value.chamado.descricao,
                value.setor,
                value.situacao.nome,
                value.chamado.id_tecnico,
                value.ultimaAlteracao,
                value.chamado.data,
              ])}
            />
          )}
        </TableContext.Provider>
      </AdminRightDiv>
    );
  }
}
