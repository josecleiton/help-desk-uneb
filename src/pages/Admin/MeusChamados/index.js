import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AdminTitle from '../../../components/Admin/Title';
import AdminRightDiv from '../../../components/Admin/RightDiv';
import TableContext from '../../../components/Table/Context';
import Table from '../../../components/Table';

export default class AdminMeusChamados extends Component {
  currentPath = () => {
    const {
      match: { path },
    } = this.props;
    return path;
  };

  render() {
    return (
      <AdminRightDiv>
        <AdminTitle comment="comentário">Meus Chamados</AdminTitle>
        <TableContext.Provider value={{}}>
          <Table
            title="Chamados de Cleiton"
            margin="1.5% auto"
            maxRowsPerPage={5}
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

AdminMeusChamados.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
