import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MainHeader from '../../components/Main/Header';
import LargeBox from '../../components/LargeBox';
import Footer from '../../components/Footer';
import HistoricoMovimentacao from '../../components/HistoricoChamado';
import api from '../../services/api';

import './style.css';

export default class VisualizarChamado extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id },
      },
    } = props;
    this.state = { id, called: '', animate: false };
    console.log(id);
  }

  componentDidMount() {
    const { id } = this.state;
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
    api
      .post('/api/chamado/called', { id })
      .then((res) => {
        this.setState({ called: res.data[0] });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { id, animate, called } = this.state;

    console.log(called);
    return (
      <>
        <MainHeader />
        {called && (
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
                {called.chamado.email}
              </p>
              <p>
                <strong>Status:</strong>
                {' '}
                {called.chamado.situacao}
              </p>
              <p>
                <strong>Data de Abertura:</strong>
                {' '}
                {called.chamado.data}
              </p>

              <p>
                <strong>Área:</strong>
                {' '}
                {called.chamado.setor}
                TI
              </p>
              <HistoricoMovimentacao>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <b>Movimentação</b>
                      </th>
                      <th>
                        <b>Descrição</b>
                      </th>
                      <th>
                        <b>situação</b>
                      </th>
                      <th>
                        <b>tecnico</b>
                      </th>
                      <th>
                        <b>prioridade</b>
                      </th>
                      <th>
                        <b>data</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {called.movimentacao.map((value, index) => (
                      <tr>
                        <th>{index}</th>
                        <td>{value.descricao}</td>
                        <td>{value.situacao}</td>
                        <td>{value.tecnico}</td>
                        <td>{value.prioridade}</td>
                        <td>{value.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </HistoricoMovimentacao>
              {/* <div id="hist-mov">
             <h2>Histórico de Movimentações</h2>
           </div>
           <p>Aqui haverá uma tabela com status/area/técnico/data do ocorrido</p> */}
            </LargeBox>
          </div>
        )}
        <Footer />
      </>
    );
  }
}

VisualizarChamado.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
