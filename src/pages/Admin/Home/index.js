import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AdminMenu from '../../../components/Admin/Menu';
import AdminPageTitle from '../../../components/Admin/Title';
import AdminTable from '../../../components/Admin/Table';
import AdminRightDiv from '../../../components/Admin/RightDiv';

export default class AdminHome extends Component {
  currentPath = () => {
    const {
      match: { path },
    } = this.props;
    return path;
  };

  render() {
    return (
      <Fragment>
        <AdminMenu path={this.currentPath} />
        <AdminRightDiv>
          <AdminPageTitle comment="comentário">Painel Administrativo</AdminPageTitle>
          <AdminTable link title margin="1.5% auto" />
        </AdminRightDiv>
      </Fragment>
    );
  }
}

AdminHome.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
