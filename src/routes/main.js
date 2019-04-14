import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Admin from '../pages/Admin';
import ConsultarChamado from '../pages/ConsultarChamado';

import NotFound from '../pages/NotFound';

const MainRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/consultar-chamado/:id" component={ConsultarChamado} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default MainRoutes;
