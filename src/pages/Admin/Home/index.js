/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';

import api from '../../../services/api';

import Table from '../../../components/Table';
import TableContext from '../../../components/Table/Context';
import AdminPageTitle from '../../../components/Admin/Title';
import AdminRightDiv from '../../../components/Admin/RightDiv';
import ErrorAlert from '../../../components/ErrorAlert';
// import AdminGerenciamentoForm from '../../../components/Admin/Gerenciamento/Form';

export default class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      chamados: null,
      error: '',
    };
  }

  componentDidMount() {
    const jwtToken = localStorage.getItem('HD7-AuthToken');
    api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    api
      .post('/api/chamado/read.php', { tecnico: true, situacao: 'Em Aberto', setor: true })
      .then((res) => {
        // console.log(res);
        // this.setState({chamados: res.data});
        if (!res.data.error) {
          // window.location.reload(false);
          // console.log(res.data);
          this.setState({ loaded: true, chamados: res.data });
        } else {
          this.setState({ error: res.data.mensagem });
        }
      });
  }

  render() {
    const { loaded, chamados, error } = this.state;
    // console.log(loaded);
    // console.log(chamados);
    return (
      <AdminRightDiv>
        <AdminPageTitle comment="Painel Administrativo">HD7</AdminPageTitle>
        {!error ? (
          loaded ? (
            <TableContext.Provider
              value={{ goToUrl: '/admin/atendimento', rowsPrimaryKey: 0, payload: chamados }}
            >
              <Table
                title="Chamados em aberto"
                margin="1.5% auto"
                columnSortKey={5}
                dateFields={[5]}
                head={[
                  '#',
                  'Setor',
                  'Prioridade',
                  'Problema',
                  'Qtd de dias',
                  'Data de Abertura',
                  'Solicitante',
                ]}
                maxRowsPerPage={20}
                // rows={this.getChamados(chamados)}
                rows={chamados.map((el) => {
                  // console.log(el);
                  const {
                    id,
                    setor: { nome: setorNome },
                    usuario: { nome: usuarioNome },
                    alteracoes,
                    descricao,
                  } = el;
                  const { data } = alteracoes[0];
                  const prioridade = alteracoes[alteracoes.length - 1].prioridade.descricao;
                  const qtdDias = Math.floor((new Date() - new Date(data)) / (86400 * 1000));
                  return [
                    Number(id),
                    setorNome,
                    prioridade,
                    descricao,
                    qtdDias,
                    data,
                    usuarioNome,
                  ];
                })}
                // rows={[
                //   [
                //     '190001',
                //     'TI',
                //     'Em aberto',
                //     'Java bugou',
                //     'X',
                //     '19/10/2018',
                //     'brancobro@yahoo.com.br',
                //   ],
                //   [
                //     '190002',
                //     'TI',
                //     'Em atendimento',
                //     'Impressora sem papel',
                //     'X',
                //     '14/04/2019',
                //     'rafamoreira@777.com',
                //   ],
                // ]}
              />
            </TableContext.Provider>
          ) : (
            <div>Loading</div>
          )
        ) : (
          <ErrorAlert>
$
            {error}
          </ErrorAlert>
        )}
      </AdminRightDiv>
    );
  }
}
