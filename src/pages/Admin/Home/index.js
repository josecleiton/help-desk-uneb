import React from 'react';

import Table from '../../../components/Table';
import AdminPageTitle from '../../../components/Admin/Title';
import AdminRightDiv from '../../../components/Admin/RightDiv';

const AdminHome = () => (
  <AdminRightDiv>
    <AdminPageTitle comment="comentário">Painel Administrativo</AdminPageTitle>
    <Table
      title="Chamados em aberto"
      margin="1.5% auto"
      goToUrl="/admin/atendimento"
      rowsPrimaryKey={0}
      columnSortKey={5}
      dateFields={[5]}
      head={['#', 'Área', 'Situação', 'Problema', 'Qtd de dias', 'Data de Abertura', 'Solicitante']}
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
  </AdminRightDiv>
);

export default AdminHome;
