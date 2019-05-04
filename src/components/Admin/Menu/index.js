import React, { Component } from 'react';
import AdminMenuItem from './Item';
import './style.css';
import Estados from '../../../configs/estados';
import UserInfo from './UserInfo';

export default class AdminMenu extends Component {
  constructor(props) {
    super(props);
    this.criaArrayDeEstados();
  }

  criaArrayDeEstados = () => {
    this.Estados = [{ todos: 'Todos' }];
    Estados.forEach((element) => {
      const value = element;
      let key = element;
      const blankSpace = element.indexOf(' ');

      if (blankSpace !== -1) {
        key = element.substr(blankSpace + 1, element.length - blankSpace - 1);
      }
      key = key.toLowerCase();
      if (key !== 'aberto') this.Estados.push({ [key]: value });
    });
  };

  render() {
    return (
      <div className="admin-menu">
        <UserInfo />
        <ul role="menu">
          <AdminMenuItem url="/admin">Início</AdminMenuItem>
          <AdminMenuItem url="/admin/meus-chamados" icon="fas fa-envelope" submenu={this.Estados}>
            Meus Chamados
          </AdminMenuItem>
          <AdminMenuItem
            url="/admin/gerenciamento"
            submenu={[{ areas: 'Áreas' }, { chamados: 'Chamados' }, { tecnicos: 'Técnicos' }]}
            icon="fas fa-tools"
          >
            Gerenciar
          </AdminMenuItem>
        </ul>
      </div>
    );
  }
}
