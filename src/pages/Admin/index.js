import React from 'react';

import AdminRoutes from '../../routes/admin';
// import AdminContext from './context';

import AdminMenu from '../../components/Admin/Menu';

const Admin = () => (
  <>
    {/* <Header>
      <AdminHeader />
    </Header> */}
    <AdminMenu />
    <AdminRoutes />
  </>
);

export default Admin;
