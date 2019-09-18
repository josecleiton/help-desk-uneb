/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import AdminRoutes from '../../routes/admin';
import AdminContext from '../../components/Admin/Context';

import AdminMenu from '../../components/Admin/Menu';
import Loading from '../../components/Loading';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      error: null,
    };
  }

  componentDidMount() {
    // pega token, se user for passado por prop, return, se não peça user para a api
    const { location } = this.props;
    if (location && location.state && location.state.user) {
      this.setState({ user: location.state.user });
      return;
    }
    // const jwtToken = localStorage.getItem('HD7-AuthToken');
    // console.log(jwtToken);
    const jwtToken = localStorage.getItem('HD7-AuthToken');
    api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    api.post('/auth/info.php').then((res) => {
      const { data } = res;
      // console.log(data);
      if (!data.error) {
        // const { user } = data;
        // console.log(user);
        this.setState({ user: data });
      } else {
        this.setState({ error: data.mensagem });
      }
    });
  }

  render() {
    // const {location: {state: {user}}} = this.props;
    const { user, error } = this.state;
    return !error ? (
      user ? (
        <AdminContext.Provider value={{ user }}>
          <AdminMenu />
          <AdminRoutes />
        </AdminContext.Provider>
      ) : (
        <Loading />
      )
    ) : (
      <div>{error}</div>
    );
  }
}

Admin.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
