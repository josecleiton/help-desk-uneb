import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import TablePage from '../pages/Table';
import ConsultarChamado from '../pages/ConsultarChamado';
import AbrirChamado from '../pages/AbrirChamado';

import NotFound from '../pages/NotFound';

const MainRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/consultar-chamado/:id" component={ConsultarChamado} />
      <Route path="/admin" component={Admin} />
      <Route path="/table" component={TablePage} />
      <Route path="/abrir-chamado" component={AbrirChamado} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default MainRoutes;