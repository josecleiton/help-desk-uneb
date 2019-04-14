import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminHomePage from '../pages/Admin/Home';
import AdminMeusChamados from '../pages/Admin/MeusChamados';
import NotFound from '../pages/NotFound';

const AdminRoutes = () => (
  <Switch>
    <Route exact path="/admin" component={AdminHomePage} />
    <Route path="/admin/chamados" component={AdminMeusChamados} />
    <Route component={NotFound} />
  </Switch>
);

export default AdminRoutes;
