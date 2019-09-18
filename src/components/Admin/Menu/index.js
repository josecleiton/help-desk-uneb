import React, { Component } from 'react';
import Media from 'react-media';

import AdminContext from '../Context';

import AdminMenuItem from './Item';
// import Config from '../../../configs';
import UserInfo from './UserInfo';
import AdminFooter from './Footer';
import api from '../../../services/api';

import './style.css';

export default class AdminMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estados: null,
    };
  }

  componentDidMount() {
    const estados = [{ Todos: 'Todos' }];
    api.get('/situacao/read.php').then((res) => {
      const { data } = res;
      data.forEach((element) => {
        if (element.nome !== 'Em Aberto') estados.push({ [element.nome]: element.nome });
      });
      this.setState({ estados });
    });
  }

  // criaArrayDeEstados = () => {
  //   this.Estados = [{ Todos: 'Todos' }];
  //   Config.getEstados().then((res) => {
  //     if (res) {
  //       res.forEach((element) => {
  //         if (element !== 'Em Aberto') this.Estados.push({ [element.nome]: element.nome });
  //       });
  //     } else {
  //       console.log('Deu ruim na hora de pegar os estados');
  //     }
  //   });
  //   console.log(this.Estados);
  //   // const Estados = ['Em Aberto', 'Em Atendimento', 'Pendente', 'Transferido', 'Concluido'];
  //   // Estados.forEach((element) => {
  //   //   // const value = element;
  //   //   // let key = element;
  //   //   // const blankSpace = element.indexOf(' ');

  //   //   // if (blankSpace !== -1) {
  //   //   //   key = element.substr(blankSpace + 1, element.length - blankSpace - 1);
  //   //   // }
  //   //   // key = key.toLowerCase();
  //   //   if (element !== 'Em Aberto') this.Estados.push({ [element]: element });
  //   // });
  // };
  makeGerenciamento = (cargo, matches) => {
    if (cargo) {
      const submenu = [{ tecnicos: 'Técnicos' }];
      if (cargo === 'A') submenu.push({ setores: 'Setores' });
      else submenu.push({ problemas: 'Problemas' });

      return (
        <AdminMenuItem
          url="/admin/gerenciamento"
          submenu={submenu}
          icon="fas fa-tools"
          expand={matches}
        >
          Gerenciar
        </AdminMenuItem>
      );
    }
    return null;
  };

  render() {
    const { estados } = this.state;
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
                    {estados && (
                      <AdminMenuItem
                        url="/admin/meus-chamados"
                        icon="fas fa-envelope"
                        submenu={estados}
                        expand={matches}
                      >
                        Meus Chamados
                      </AdminMenuItem>
                    )}
                    {this.makeGerenciamento(cargo, matches)}
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
