/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import MainHeader from '../../components/Main/Header';
import TableContext from '../../components/Table/Context';
import Table from '../../components/Table';
import Footer from '../../components/Footer';

import './style.css';

export default class ChamadosCPF extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { cpf },
      },
    } = props;
    this.cpf = this.makeCPF(cpf);
    this.state = {
      chamados: null,
      error: false,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { cpf },
      },
    } = this.props;
    api.post('/api/usuario/read.php', { cpf }).then((res) => {
      const { data } = res;
      const { chamados, error } = data;
      // console.log(chamados);
      if (!error) {
        const usuario = {
          cpf: data.cpf,
          email: data.email,
          telefone: data.telefone,
          nome: data.nome,
        };
        chamados.forEach((element) => {
          // eslint-disable-next-line no-param-reassign
          element.usuario = usuario;
        });
        this.setState({ chamados });
      } else {
        this.setState({ error });
      }
    });
  }

  makeCPF = (toCPF) => {
    let cpf = '';
    const delimeters = '..-';
    for (let i = 0, j = 0, limit = toCPF.length; i < limit; i += 3) {
      if (j <= 2) {
        cpf += toCPF.substr(i, 3) + delimeters[j];
        j += 1;
      } else {
        cpf += toCPF.substr(i, 2);
      }
    }
    return cpf;
  };

  chamadosToArray = (chamados) => {
    if (chamados) {
      return chamados.map((chamado) => {
        const {
          id,
          descricao,
          setor: { nome: setorNome },
          tecnico: { email: tecnicoEmail },
          data,
          alteracoes,
        } = chamado;
        let situacao = 'Em aberto';
        let ultimaModificacao = 'Não houve';
        if (alteracoes) {
          situacao = alteracoes[alteracoes.length - 1].status;
          ultimaModificacao = alteracoes[alteracoes.length - 1].descricao;
        }
        // console.log(chamado);
        return [id, '', descricao, setorNome, situacao, tecnicoEmail, data, ultimaModificacao];
      });
    }
    return null;
  };

  render() {
    const { error, chamados } = this.state;
    return (
      <>
        <MainHeader />
        <div className="chamados-cpf">
          <h1>Chamados por CPF</h1>
        </div>
        {!error ? (
          chamados ? (
            <>
              <TableContext.Provider
                value={{
                  goToUrl: '/chamado',
                  rowsPrimaryKey: 0,
                  payload: chamados,
                  checkInfo: { 4: ['Em aberto', '/edit-chamado'] },
                }}
              >
                <Table
                  title={` ${this.cpf}`}
                  head={[
                    '#',
                    'Equipamento',
                    'Descrição',
                    'Setor',
                    'Status',
                    'Técnico',
                    'Data de criação',
                    'Última modificação',
                  ]}
                  dateFields={[6, 7]}
                  columnSortKey={6}
                  rows={this.chamadosToArray(chamados)}
                  maxRowsPerPage={10}
                />
              </TableContext.Provider>
            </>
          ) : (
              <>
                <div>Carregando...</div>
              </>
            )
        ) : (
            <>
              {' '}
              <div>{`ERROR: ${error}`}</div>
              {' '}
            </>
          )}
        <Footer />
      </>
    );
  }
}

ChamadosCPF.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
