import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import MainHeader from '../../components/Main/Header';
import LargeBox from '../../components/LargeBox';

import './style.css';

export default class VisualizarChamado extends Component {
  constructor() {
    super();
    this.state = { id: '', animate: false };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ id });
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  render() {
    const { id, animate } = this.state;
    return (
      <Fragment>
        <Header>
          <MainHeader />
        </Header>
        <div id="consultar-chamado" style={{ opacity: animate ? 1 : 0 }}>
          <p className="consultar-chamado-title">
            Chamado
            {' '}
            {'  '}
            {`#${id}`}
          </p>
          <LargeBox style={{ width: '95%' }}>
            <p>
              <strong>Solicitante:</strong>
              {' '}
user@email.com
            </p>
            <p>
              <strong>Status:</strong>
              {' '}
Aberto
            </p>
            <p>
              <strong>Data de Abertura:</strong>
              {' '}
dd/mm/YYYY
            </p>

            <p>
              <strong>Área:</strong>
              {' '}
TI
            </p>
            <div id="hist-mov">
              <h2>Histórico de Movimentações</h2>
            </div>
            <p>Aqui haverá uma tabela com status/area/técnico/data do ocorrido</p>
          </LargeBox>
        </div>
      </Fragment>
    );
  }
}

VisualizarChamado.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
