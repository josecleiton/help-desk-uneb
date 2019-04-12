import React, { Component, Fragment } from 'react';

import AdminMenu from '../../components/AdminMenu';
import AdminTable from '../../components/AdminTable';
import './style.css';

export default class Admin extends Component {
  constructor() {
    super();
    this.state = {
      animate: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  currentPath = () => {
    const {
      // eslint-disable-next-line react/prop-types
      match: { path },
    } = this.props;
    return path;
  };

  render() {
    const { animate } = this.state;
    return (
      <Fragment>
        <header className="bar">
          <nav>Mudar isso aqui. Lorem ipsum dolor sit amet consectetur adipisicing elit.</nav>
        </header>
        <div id="admin-left">
          <AdminMenu path={this.currentPath} />
        </div>
        <div id="admin-right" style={{ opacity: animate ? 1 : 0 }}>
          <span className="admin-page-title">
            <h2>Painel de Administração</h2>
            <h3>comentário</h3>
          </span>
          <div style={{ marginTop: '10%' }}>
            <AdminTable title />
          </div>
        </div>
      </Fragment>
    );
  }
}
