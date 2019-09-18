/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import AbrirChamadoForm from '../../components/AbrirChamado/Form';
import MainHeader from '../../components/Main/Header';
import Footer from '../../components/Footer';
import ErrorAlert from '../../components/ErrorAlert';
import Loading from '../../components/Loading';

export default class AbrirChamado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problemas: null,
      error: '',
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { setor },
      },
    } = this.props;

    // console.log(setor);
    api
      .post('/problema/read.php', { setor })
      .then((res) => {
        if (!res.data.error) {
          console.log(res.data);
          this.setState({ problemas: res.data });
        } else {
          this.setState({ error: res.data.mensagem });
        }
      })
      .catch(() => {
        this.setState({ error: 'Erro no servidor' });
      });
  }

  render() {
    const {
      match: {
        params: { setor },
      },
      location,
      history,
    } = this.props;
    const { problemas, error } = this.state;
    return location.state ? (
      <>
        <MainHeader />
        {!error ? (
          problemas ? (
            <AbrirChamadoForm history={history} setor={setor} problemas={problemas} />
          ) : (
            <Loading />
          )
        ) : (
          <ErrorAlert>{error}</ErrorAlert>
        )}
        <Footer />
      </>
    ) : (
      <Redirect to={{ pathname: '/acesso-invalido', state: { from: location } }} />
    );
  }
}

// const AbrirChamado = ({
//   match: {
//     params: { setor },
//   },
//   location,
// }) => (location.state ? (
//   <>
//     <MainHeader />
//     <AbrirChamadoForm setor={setor} />
//     <Footer />
//   </>
// ) : (
//   <Redirect to={{ pathname: '/acesso-invalido', state: { from: location } }} />
// ));

AbrirChamado.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
