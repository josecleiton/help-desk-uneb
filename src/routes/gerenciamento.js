import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRouteAdmin from './PrivateRoute/Admin';

import GerenciamentoAreas from '../pages/Admin/Gerenciamento/Areas';
import GerenciamentoTecnicos from '../pages/Admin/Gerenciamento/Tecnicos';
import GerenciamentoProblemas from '../pages/Admin/Gerenciamento/Problema';
import GerenciamentoSetores from '../pages/Admin/Gerenciamento/Setores';
import GerenciamentoHome from '../pages/Admin/Gerenciamento/Home';
import GerenciamentoSetor from '../pages/Admin/Gerenciamento/Setores/Setor';
import GerenciamentoEditProblema from '../pages/Admin/Gerenciamento/Problema/Edit'

const GerenciamentoRoutes = () => (
  <Switch>
    <Route exact path="/admin/gerenciamento" component={GerenciamentoHome} />
    <Route path="/admin/gerenciamento/areas" component={GerenciamentoAreas} />
    <Route path="/admin/gerenciamento/tecnicos" component={GerenciamentoTecnicos} />
    <Route path="/admin/gerenciamento/chamados" component={GerenciamentoProblemas} />
    <PrivateRouteAdmin cargo="A" path="/admin/gerenciamento/setores" component={GerenciamentoSetores} />
    <PrivateRouteAdmin cargo="A" path="/admin/gerenciamento/setor/:nome" component={GerenciamentoSetor} />
    <Route path="/admin/gerenciamento/edit-problema" component={GerenciamentoEditProblema} />
  </Switch>
);
// <PrivateRouteAdmin cargo="A" path="/admin/gerenciamento/admin" component={GerenciamentoAdmin} />

export default GerenciamentoRoutes;
