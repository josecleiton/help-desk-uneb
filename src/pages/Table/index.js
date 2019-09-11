import React from 'react';
import TableContext from '../../components/Table/Context';
import Table from '../../components/Table';

const TablePage = () => (
  <TableContext.Provider value={{}}>
    <Table
      head={[
        '#',
        'Setor',
        'Situação',
        'Problema',
        'Qtd de dias',
        'Data de Abertura',
        'Solicitante',
      ]}
      columnSortKey={5}
      dateFields={[5]}
      rows={[
        ['190001', 'TI', 'Em aberto', 'Java bugou', 'X', '19/10/2018', 'brancobro@yahoo.com.br'],
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
);

export default TablePage;
