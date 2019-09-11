import React, { Component } from 'react';

import api from '../../../services/api';

import Table from '../../../components/Table';
import TableContext from '../../../components/Table/Context';
import AdminPageTitle from '../../../components/Admin/Title';
import AdminRightDiv from '../../../components/Admin/RightDiv';

export default class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      chamados: null,
    };
  }

  componentDidMount() {
    // const jwtToken = localStorage.getItem('HD7-AuthToken');
    // console.log(jwtToken);
    // api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('HD7-AuthToken')}`
    api.post('/api/chamado/read_em_aberto.php').then((res) => {
      // console.log(res);
      // this.setState({chamados: res.data});
      if (!res.data.error) {
        // window.location.reload(false);
        this.setState({ loaded: true, chamados: res.data });
      }

    })
  }

  // shouldComponentUpdate() {
  //   const { chamados } = this.state;
  //   return chamados.length;
  // }

  getChamados = chamados => chamados.map((el) => {
    const {
      id,
      setor: { nome: setorNome },
      data,
      usuario: { nome: usuarioNome },
      alteracoes,
    } = el;
    let situacao = 'Em aberto';
    if (alteracoes) {
      situacao = alteracoes[alteracoes.length - 1].status;
    }
    const qtdDias = Math.floor((new Date() - new Date(data)) / (86400 * 1000));
    return [id, setorNome, situacao, 'problema', qtdDias, data, usuarioNome];
  });

  render() {
    const { loaded, chamados } = this.state;
    // console.log(loaded);
    // console.log(chamados);
    return (
      <AdminRightDiv>
        <AdminPageTitle comment="Painel Administrativo">HD7</AdminPageTitle>
        {loaded ? (
          <TableContext.Provider value={{ goToUrl: '/admin/atendimento', rowsPrimaryKey: 0 }}>
            <Table
              title="Chamados em aberto"
              margin="1.5% auto"
              columnSortKey={5}
              dateFields={[5]}
              head={[
                '#',
                'Setor',
                'Situação',
                'Problema',
                'Qtd de dias',
                'Data de Abertura',
                'Solicitante',
              ]}
              maxRowsPerPage={10}
              // rows={this.getChamados(chamados)}
              rows={chamados.map((el) => {
                // console.log(el);
                const {
                  id,
                  setor: { nome: setorNome },
                  data,
                  usuario: { nome: usuarioNome },
                  alteracoes,
                } = el;
                let situacao = 'Em aberto';
                if (alteracoes) {
                  situacao = alteracoes[alteracoes.length - 1].status;
                }
                const qtdDias = Math.floor((new Date() - new Date(data)) / (86400 * 1000));
                return [id, setorNome, situacao, 'problema', qtdDias, data, usuarioNome];
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
          )}
      </AdminRightDiv>
    );
  }
}
