import React, { Component, Fragment } from 'react';

import AdminMenu from '../../components/AdminMenu';
import AdminHomePage from './Home';
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
          <nav>Mudar isso aqui.</nav>
        </header>
        <div id="admin-left">
          <AdminMenu path={this.currentPath} />
        </div>
        <div id="admin-right" style={{ opacity: animate ? 1 : 0 }}>
          <AdminHomePage />
        </div>
      </Fragment>
    );
  }
}
