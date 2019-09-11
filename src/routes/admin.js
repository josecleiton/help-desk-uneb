import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRouteAdmin from './PrivateRoute/Admin';

import AdminHomePage from '../pages/Admin/Home';
import AdminMeusChamados from '../pages/Admin/MeusChamados';
import Atendimento from '../pages/Admin/Atendimento';
import Gerenciamento from '../pages/Admin/Gerenciamento';
import AdminSair from '../components/Admin/Auth/Sair';
import NotFound from '../pages/NotFound';

const AdminRoutes = () => (
  <Switch>
    <Route exact path="/admin" component={AdminHomePage} />
    <Route path="/admin/meus-chamados/:selection?" component={AdminMeusChamados} />
    <PrivateRouteAdmin cargo="G" path="/admin/gerenciamento/" component={Gerenciamento} />
    <Route path="/admin/atendimento/:id" component={Atendimento} />
    <Route path="/admin/sair" component={AdminSair} />
    <Route component={NotFound} />
  </Switch>
);

export default AdminRoutes;
