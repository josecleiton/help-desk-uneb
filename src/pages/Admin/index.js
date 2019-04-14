import React, { Component, Fragment } from 'react';

import AdminRoutes from '../../routes/admin';

// import AdminMenu from '../../components/Admin/Menu';

export default class Admin extends Component {
  render() {
    return (
      <Fragment>
        <header className="bar">
          <nav>Mudar isso aqui.</nav>
        </header>
        <AdminRoutes />
      </Fragment>
    );
  }
}
