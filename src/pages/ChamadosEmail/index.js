import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import MainHeader from '../../components/Main/Header';
import Table from '../../components/Table';
import Footer from '../../components/Footer';

import './style.css';

const ChamadosEmail = (props) => {
  const {
    match: {
      params: { email },
    },
    history: { push },
  } = props;
  return (
    <Fragment>
      <MainHeader />
      <div className="chamados-email">
        <h1>Chamados por Email</h1>
      </div>
      <Table
        title={` ${email}`}
        redirect={push}
        goToUrl="/chamado"
        head={['#', 'Status', 'Técnico', 'Última modificação', 'Data de criação']}
        rowsPrimaryKey={0}
        dateFields={[3, 4]}
        rows={[
          ['19001', 'Em atendimento', 'Cleiton', '18/04/2019 02:00', '17/03/2018 00:00'],
          ['19002', 'Concluído', 'Cleiton', '15/04/2019 11:00', '10/04/2019 22:00'],
        ]}
      />
      <Footer />
    </Fragment>
  );
};

ChamadosEmail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ChamadosEmail;
