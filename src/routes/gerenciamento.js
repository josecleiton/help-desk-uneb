import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRouteAdmin from './PrivateRoute/Admin';

import GerenciamentoAreas from '../pages/Admin/Gerenciamento/Areas';
import GerenciamentoTecnicos from '../pages/Admin/Gerenciamento/Tecnicos';
import GerenciamentoChamados from '../pages/Admin/Gerenciamento/Chamados';
import GerenciamentoSetores from '../pages/Admin/Gerenciamento/Setores';
import GerenciamentoHome from '../pages/Admin/Gerenciamento/Home';

const GerenciamentoRoutes = () => (
  <Switch>
    <Route exact path="/admin/gerenciamento" component={GerenciamentoHome} />
    <Route path="/admin/gerenciamento/areas" component={GerenciamentoAreas} />
    <Route path="/admin/gerenciamento/tecnicos" component={GerenciamentoTecnicos} />
    <Route path="/admin/gerenciamento/chamados" component={GerenciamentoChamados} />
    <PrivateRouteAdmin cargo="A" path="/admin/gerenciamento/setores" component={GerenciamentoSetores} />
  </Switch>
);
// <PrivateRouteAdmin cargo="A" path="/admin/gerenciamento/admin" component={GerenciamentoAdmin} />

export default GerenciamentoRoutes;
