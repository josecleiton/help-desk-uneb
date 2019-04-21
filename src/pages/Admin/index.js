import React, { Fragment } from 'react';

import AdminRoutes from '../../routes/admin';

import Header from '../../components/Header';
import AdminHeader from '../../components/Admin/Header';

const Admin = () => (
  <Fragment>
    <Header>
      <AdminHeader />
    </Header>
    <AdminRoutes />
  </Fragment>
);

export default Admin;
