import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MainHeader from '../../components/Main/Header';
import LargeBox from '../../components/LargeBox';

import './style.css';

export default class VisualizarChamado extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id },
      },
    } = props;
    this.state = { id, animate: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  render() {
    const { id, animate } = this.state;
    return (
      <>
        <MainHeader />
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
      </>
    );
  }
}

VisualizarChamado.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
