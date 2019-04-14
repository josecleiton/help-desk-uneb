import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminMenuItem from './Item';
import './style.css';
import Estados from '../../misc/estados';

export default class AdminMenu extends Component {
  constructor() {
    super();
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
      this.Estados.push({ [key.toLowerCase()]: value });
    });
  };

  render() {
    const { path } = this.props;
    return (
      <div className="admin-menu">
        <ul>
          <AdminMenuItem url="/admin" currentpath={path}>
            Início
          </AdminMenuItem>
          <AdminMenuItem
            url="/admin/meus-chamados"
            icon="fas fa-envelope"
            submenu={this.Estados}
            currentpath={path}
          >
            Meus Chamados
          </AdminMenuItem>
          {/* <AdminMenuItem
            url="/admin/test"
            icon="fas fa-question"
            submenu={['Test 1', 'Test 2']}
            currentpath={path}
          >
            Test
          </AdminMenuItem> */}
        </ul>
      </div>
    );
  }
}

AdminMenu.propTypes = {
  path: PropTypes.func.isRequired,
};
