import React, { Component } from 'react';
import Media from 'react-media';

import AdminContext from '../Context';

import AdminMenuItem from './Item';
import Estados from '../../../configs/estados';
import UserInfo from './UserInfo';
import AdminFooter from './Footer';

import './style.css';

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
      <AdminContext.Consumer>
        {(state) => {
          const cargo = state.user.cargo || '';
          // console.log(state);
          return (
            <Media query="(min-width: 650px)">
              {matches => (
                <div className="admin-menu">
                  <UserInfo expand={matches} />
                  <ul role="menu">
                    <AdminMenuItem url="/admin" expand={matches}>
                      Início
                    </AdminMenuItem>
                    <AdminMenuItem
                      url="/admin/meus-chamados"
                      icon="fas fa-envelope"
                      submenu={this.Estados}
                      expand={matches}
                    >
                      Meus Chamados
                    </AdminMenuItem>
                    {cargo && (
                      <AdminMenuItem
                        url="/admin/gerenciamento"
                        submenu={[
                          { chamados: 'Chamados' },
                          { tecnicos: 'Técnicos' },
                          cargo === 'A' && { setores: 'Setores' },
                        ]}
                        icon="fas fa-tools"
                        expand={matches}
                      >
                        Gerenciar
                      </AdminMenuItem>
                    )}
                  </ul>
                  <AdminFooter expand={matches} />
                </div>
              )}
            </Media>
          );
        }}
      </AdminContext.Consumer>
    );
  }
}
