import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <AdminRightDiv>
        <AdminTitle comment="comentário">Meus Chamados</AdminTitle>
      </AdminRightDiv>
    );
  }
}

AdminMeusChamados.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
