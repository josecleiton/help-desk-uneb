import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminMenuItem from './Item';
import './style.css';
import Estados from '../misc/estados';

export default class AdminMenu extends Component {
  componentWillMount() {
    Estados.shift();
  }

  componentDidMount() {
    Estados.unshift('Todos');
  }

  render() {
    const { path } = this.props;
    return (
      <div className="admin-menu">
        <ul>
          <AdminMenuItem url="/admin" currentpath={path}>
            Início
          </AdminMenuItem>
          <AdminMenuItem
            url="/admin/my"
            icon="fas fa-envelope"
            submenu={Estados}
            currentpath={path}
          >
            Meus Chamados
          </AdminMenuItem>
          <AdminMenuItem
            url="/admin/test"
            icon="fas fa-question"
            submenu={['Test 1', 'Test 2']}
            currentpath={path}
          >
            Test
          </AdminMenuItem>
        </ul>
      </div>
    );
  }
}

AdminMenu.propTypes = {
  path: PropTypes.func.isRequired,
};
