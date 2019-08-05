import React, { Component } from 'react';

import Table from '../../../components/Table';
import TableContext from '../../../components/Table/Context';
import AdminPageTitle from '../../../components/Admin/Title';
import AdminRightDiv from '../../../components/Admin/RightDiv';
import AdminGerenciamentoForm from '../../../components/Admin/Gerenciamento/Form';

export default class AdminHome extends Component {
  render() {
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
            rows={[
              [
                '190001',
                'TI',
                'Em aberto',
                'Java bugou',
                'X',
                '19/10/2018',
                'brancobro@yahoo.com.br',
              ],
              [
                '190002',
                'TI',
                'Em atendimento',
                'Impressora sem papel',
                'X',
                '14/04/2019',
                'rafamoreira@777.com',
              ],
            ]}
          />
        </TableContext.Provider>
      </AdminRightDiv>
    );
  }
}
