import React from 'react';
import AdminTable from '../../components/Admin/Table';

const TablePage = () => (
  <AdminTable
    head={['#', 'Área', 'Situação', 'Problema', 'Qtd de dias', 'Data de Abertura', 'Solicitante']}
    rows={[
      ['190001', 'TI', 'Em aberto', 'Java bugou', 'X', 'dd/mm/YYYY', 'brancobro@yahoo.com.br'],
      [
        '190002',
        'TI',
        'Em atendimento',
        'Impressora sem papel',
        'X',
        'dd/mm/YYYY',
        'rafamoreira@777.com',
      ],
    ]}
  />
);

export default TablePage;
