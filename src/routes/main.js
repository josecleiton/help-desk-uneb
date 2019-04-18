import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import TablePage from '../pages/Table';
import VisualizarChamado from '../pages/Chamado';
import AbrirChamado from '../pages/AbrirChamado';
import ChamadosEmail from '../pages/ChamadosEmail';

import NotFound from '../pages/NotFound';

const MainRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/chamado/:id" component={VisualizarChamado} />
      <Route path="/chamados-email/:email" component={ChamadosEmail} />
      <Route path="/admin" component={Admin} />
      <Route path="/table" component={TablePage} />
      <Route path="/abrir-chamado" component={AbrirChamado} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default MainRoutes;
