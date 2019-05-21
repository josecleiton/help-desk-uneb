import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import AbrirChamadoForm from '../../components/AbrirChamado/Form';
import MainHeader from '../../components/Main/Header';
import Footer from '../../components/Footer';

const AbrirChamado = ({
  match: {
    params: { setor },
  },
  location,
}) => (location.state ? (
  <>
    <MainHeader />
    <AbrirChamadoForm setor={setor} />
    <Footer />
  </>
) : (
  <Redirect to={{ pathname: '/acesso-invalido', state: { from: location } }} />
));

AbrirChamado.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AbrirChamado;
