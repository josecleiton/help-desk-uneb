import React from 'react';
import PropTypes from 'prop-types';

import AbrirChamadoForm from '../../components/AbrirChamado/Form';
import MainHeader from '../../components/Main/Header';
import Footer from '../../components/Footer';

const AbrirChamado = ({
  match: {
    params: { setor },
  },
}) => (
  <div>
    <MainHeader />
    <AbrirChamadoForm setor={setor} />
    <Footer />
  </div>
);

AbrirChamado.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AbrirChamado;
