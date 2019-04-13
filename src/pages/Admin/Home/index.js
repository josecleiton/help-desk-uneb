import React, { Fragment } from 'react';
import AdminPageTitle from '../../../components/AdminPageTitle';
import AdminTable from '../../../components/AdminTable';

const AdminHome = () => (
  <Fragment>
    <AdminPageTitle title="Painel Administrativo" comment="comentário" />
    <AdminTable title top="80px" />
  </Fragment>
);

export default AdminHome;
