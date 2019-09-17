/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../../../../services/api';

import AdminRightDiv from '../../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../../components/Admin/Title';
import LargeBox from '../../../../../components/LargeBox';
import ErrorAlert from '../../../../../components/ErrorAlert';
// import Deck from '../../../../../components/Admin/Deck';
import Loading from '../../../../../components/Loading';
import GerenciamentoTecnicoForm from '../../../../../components/Admin/Gerenciamento/Tecnico';
// import './style.css';
// import GerenciamentoSetores from '..';

export default class GerenciamentoTecnico extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { login },
      },
    } = props;
    this.state = {
      error: '',
      login,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { login } = this.state;
    if (location && location.state && location.state.payload) {
      const {
        state: { payload: tecnico },
      } = location;
      this.setState({ tecnico });
      // console.log(setor);
    } else {
      const jwtToken = localStorage.getItem('HD7-AuthToken');
      api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
      api.post('/api/tecnico/read.php', { login }).then((res) => {
        // console.log(res.data);
        if (!res.data.error) {
          this.setState({ tecnico: res.data });
        } else {
          this.setState({ error: res.data.mensagem });
        }
      });
    }
  }

  render() {
    const { tecnico, error } = this.state;
    const { history } = this.props;
    return (
      <AdminRightDiv>
        <AdminPageTitle comment="editando">Técnico</AdminPageTitle>
        {/* <div>{nome}</div> */}
        <LargeBox className="admin-setores-setor-box">
          {error ? (
            <ErrorAlert>{error}</ErrorAlert>
          ) : tecnico ? (
            <>
              <p>
                <h2 style={{ marginBottom: '10px' }}>Dados do Técnico</h2>
              </p>
              <p>
                <strong>Nome:</strong>
                {` ${tecnico.nome}`}
              </p>
              <p>
                <strong>Login:</strong>
                {` ${tecnico.login}`}
              </p>
              <p>
                <strong>Cargo:</strong>
                {` ${tecnico.cargo}`}
              </p>
              <p>
                <strong>Email:</strong>
                {` ${tecnico.email}`}
              </p>
              <p>
                <strong>Telefone:</strong>
                {` ${tecnico.telefone}`}
              </p>
            </>
          ) : (
            <Loading />
          )}
        </LargeBox>
        {tecnico && <GerenciamentoTecnicoForm history={history} tecnico={tecnico} />}
      </AdminRightDiv>
    );
  }
}

GerenciamentoTecnico.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
