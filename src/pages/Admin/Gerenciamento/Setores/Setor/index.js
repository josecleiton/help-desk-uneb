/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../../../../services/api';

import AdminRightDiv from '../../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../../components/Admin/Title';
import LargeBox from '../../../../../components/LargeBox';
import ErrorAlert from '../../../../../components/ErrorAlert';
import Deck from '../../../../../components/Admin/Deck';
import GerenciamentoSetorForm from '../../../../../components/Admin/Gerenciamento/Setor';
import './style.css';
// import GerenciamentoSetores from '..';

export default class GerenciamentoSetor extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { nome },
      },
    } = props;
    this.state = {
      error: '',
      setor: null,
      nome,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { nome } = this.state;
    if (location && location.state && location.state.payload) {
      const {
        state: { payload: setor },
      } = location;
      this.setState({ setor });
      // console.log(setor);
    } else {
      api.post('/api/setor/read.php', { nome }).then((res) => {
        // console.log(res.data);
        if (!res.data.error) {
          this.setState({ setor: res.data });
        } else {
          this.setState({ error: res.data.mensagem });
        }
      });
    }
  }

  render() {
    const { nome, setor, error } = this.state;
    const { history } = this.props;
    return (
      <AdminRightDiv>
        <AdminPageTitle comment="setor">{nome}</AdminPageTitle>
        {/* <div>{nome}</div> */}
        <LargeBox className="admin-setores-setor-box">
          {error ? (
            <ErrorAlert>{error}</ErrorAlert>
          ) : setor ? (
            <>
              <p>
                <h2 style={{ marginBottom: '10px' }}>Dados do Setor</h2>
              </p>
              <p>
                <strong>Código:</strong>
                {' '}
                {setor.cod}
              </p>
              <p>
                <strong>Email:</strong>
                {' '}
                {setor.email}
              </p>
              <p>
                <strong>Telefone:</strong>
                {' '}
                {setor.telefone}
              </p>
            </>
          ) : (
            'Loading...'
          )}
        </LargeBox>
        {setor && setor.problemas.length ? (
          <>
            <h2 className="admin-setores-setor">Problemas</h2>
            <Deck
              cards={setor.problemas.map((problema, idx) => ({
                info: { title: problema.descricao, chamados: idx },
                url: '/admin/gerenciamento/edit-problema',
                payload: problema,
              }))}
              exact
            />
          </>
        ) : null}
        {setor && <GerenciamentoSetorForm setor={setor} history={history} />}
      </AdminRightDiv>
    );
  }
}

GerenciamentoSetor.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
