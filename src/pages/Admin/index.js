import React from 'react';

import AdminRoutes from '../../routes/admin';
// import AdminContext from './context';

import Header from '../../components/Header';
import AdminHeader from '../../components/Admin/Header';
import AdminMenu from '../../components/Admin/Menu';

const Admin = () => (
  <>
    <Header>
      <AdminHeader />
    </Header>
    <AdminMenu />
    <AdminRoutes />
  </>
);

export default Admin;
