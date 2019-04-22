import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import AdminMenu from '../../../components/Admin/Menu';
import AdminTitle from '../../../components/Admin/Title';
import AdminRightDiv from '../../../components/Admin/RightDiv';

export default class AdminMeusChamados extends Component {
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
          <AdminTitle comment="comentário">Meus Chamados</AdminTitle>
        </AdminRightDiv>
      </Fragment>
    );
  }
}

AdminMeusChamados.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
