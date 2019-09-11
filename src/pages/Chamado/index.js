/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import TableContext from '../../components/Table/Context';
import Table from '../../components/Table';
import MainHeader from '../../components/Main/Header';
import LargeBox from '../../components/LargeBox';
import Footer from '../../components/Footer';
import HistoricoMovimentacao from '../../components/HistoricoChamado';

import './style.css';

export default class VisualizarChamado extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id },
      },
      location: { state },
    } = props;
    this.state = {
      byProp: state && state.payload,
      id,
      animate: false,
      payload: null,
      error: '',
    };
  }

  async componentDidMount() {
    const { byProp, id } = this.state;
    if (!byProp) {
      api.post('/api/chamado/read.php', { id }).then((res) => {
        const { data } = res;
        if (!data.error) {
          console.log(data);
          this.setState({ payload: data });
        } else {
          this.setState({ error: data.mensagem });
        }
      });
    }
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
  }

  formatarAlteracoes = alteracoes => alteracoes.map((ele) => {
    const {
      situacao: { nome: situacaoNome },
      descricao,
      data,
    } = ele;
    return [situacaoNome, descricao, data];
  });

  render() {
    const {
      id, animate, payload, error,
    } = this.state;
    let situacao = 'Em aberto';
    if (payload) {
      const { alteracoes } = payload;
      if (alteracoes) {
        situacao = alteracoes[alteracoes.length - 1].situacao.nome;
      }
    }
    return (
      <>
        <MainHeader />
        <div id="consultar-chamado" style={{ opacity: animate ? 1 : 0 }}>
          {error ? (
            <div>{error}</div>
          ) : payload ? (
            <>
              <p className="consultar-chamado-title">
                Chamado
                {`    #${id}`}
              </p>
              <LargeBox style={{ width: '95%' }}>
                <p>
                  <strong>Solicitante:</strong>
                  {` ${payload.usuario.nome}`}
                </p>
                <p>
                  <strong>Situação:</strong>
                  {` ${situacao}`}
                </p>
                <p>
                  <strong>Data de Abertura:</strong>
                  {` ${payload.data}`}
                </p>

<<<<<<< HEAD
                <p>
                  <strong>Setor:</strong>
                  {` ${payload.setor.nome}`}
                </p>
                {payload.alteracoes && (
                  <div>
                    <br />
                    <TableContext.Provider value={{}}>
                      <Table
                        title="Histórico de Movimentações"
                        head={['Situação', 'Descrição', 'Data']}
                        columnSortKey={2}
                        dateFields={[2]}
                        rows={this.formatarAlteracoes(payload.alteracoes)}
                      />
                    </TableContext.Provider>
                  </div>
                )}
              </LargeBox>
            </>
          ) : (
            <div>Loading...</div>
          )}
=======
            <p>
              <strong>Área:</strong>
              {' '}
TI
            </p>
            <HistoricoMovimentacao>
              Aqui terá uma tabela com todo o historico.
            </HistoricoMovimentacao>
            {/* <div id="hist-mov">
              <h2>Histórico de Movimentações</h2>
            </div>
            <p>Aqui haverá uma tabela com status/area/técnico/data do ocorrido</p> */}
          </LargeBox>
>>>>>>> 690ab45ef88e8cc704a19e6aa1b59e854b0d6b91
        </div>
        <Footer />
      </>
    );
  }
}

VisualizarChamado.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
