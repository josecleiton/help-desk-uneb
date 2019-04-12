import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Admin from './pages/Admin';
import AbrirChamado from './pages/AbrirChamado';
import ConsultarChamado from './pages/ConsultarChamado';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/abrir-chamado" component={AbrirChamado} />
      <Route path="/consultar-chamado/:id" component={ConsultarChamado} />
      <Route path="/admin" component={Admin} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
