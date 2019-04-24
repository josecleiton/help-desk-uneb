import React from 'react';
import { Switch, Route } from 'react-router-dom';

import GerenciamentoAreas from '../pages/Admin/Gerenciamento/Areas';
import GerenciamentoTecnicos from '../pages/Admin/Gerenciamento/Tecnicos';
import GerenciamentoChamados from '../pages/Admin/Gerenciamento/Chamados';
import GerenciamentoHome from '../pages/Admin/Gerenciamento/Home';

const GerenciamentoRoutes = () => (
  <Switch>
    <Route exact path="/admin/gerenciamento" component={GerenciamentoHome} />
    <Route path="/admin/gerenciamento/areas" component={GerenciamentoAreas} />
    <Route path="/admin/gerenciamento/tecnicos" component={GerenciamentoTecnicos} />
    <Route path="/admin/gerenciamento/chamados" component={GerenciamentoChamados} />
  </Switch>
);

export default GerenciamentoRoutes;
