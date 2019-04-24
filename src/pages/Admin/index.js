import React, { Fragment } from 'react';

import AdminRoutes from '../../routes/admin';
// import AdminContext from './context';

import Header from '../../components/Header';
import AdminHeader from '../../components/Admin/Header';
import AdminMenu from '../../components/Admin/Menu';

const Admin = () => (
  <Fragment>
    <Header>
      <AdminHeader />
    </Header>
    <AdminMenu />
    <AdminRoutes />
  </Fragment>
);

export default Admin;
