import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import TablePage from '../pages/Table';
import VisualizarChamado from '../pages/Chamado';
import AbrirChamado from '../pages/AbrirChamado';
import ChamadosCPF from '../pages/ChamadosCPF';
import EditChamado from '../pages/EditChamado';

import NotFound from '../pages/NotFound';
import InvalidAccess from '../pages/InvalidAccess';

const MainRoutes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/login" component={Login} />
    <Route path="/chamado/:id" component={VisualizarChamado} />
    <Route path="/chamados-cpf/:cpf" component={ChamadosCPF} />
    <Route path="/admin" component={Admin} />
    <Route path="/table" component={TablePage} />
    <Route path="/abrir-chamado/:setor" component={AbrirChamado} />
    <Route path="/edit-chamado/:id" component={EditChamado} />
    <Route path="/acesso-invalido" component={InvalidAccess} />
    <Route component={NotFound} />
  </Switch>
);

export default MainRoutes;
