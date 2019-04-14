import React, { Component, Fragment } from 'react';
import AdminMenu from '../../../components/Admin/Menu';
import AdminTitle from '../../../components/Admin/Title';
import AdminRightDiv from '../../../components/Admin/RightDiv';

export default class AdminMeusChamados extends Component {
  currentPath = () => {
    const {
      // eslint-disable-next-line react/prop-types
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
