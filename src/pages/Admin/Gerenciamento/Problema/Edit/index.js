import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import AdminRightDiv from '../../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../../components/Admin/Title';
import InvalidAccess from '../../../../InvalidAccess';

export default class GerenciamentoEditChamado extends Component {
  constructor(props) {
    super(props);
    const {
      location: { state },
    } = props;
    this.state = {
      problema: state ? state.payload : null,
    };
    // console.log(props);
  }

  render() {
    const { problema } = this.state;
    // const { location } = this.props;
    return problema ? (
      <AdminRightDiv>
        <AdminPageTitle comment="Gerenciamento">Problema</AdminPageTitle>
      </AdminRightDiv>
    ) : (
      <InvalidAccess url="/admin" />
      // <Redirect to={{ pathname: '/acesso-invalido', state: { from: location } }} />
    );
  }
}

GerenciamentoEditChamado.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
