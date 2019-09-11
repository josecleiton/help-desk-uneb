import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MainHeader from '../../components/Main/Header';
import TableContext from '../../components/Table/Context';
import Table from '../../components/Table';
import Footer from '../../components/Footer';
import api from '../../services/api';

import './style.css';

export default class ChamadosCPF extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { cpf },
      },
    } = props;
    this.state = {
      chamado: null,
    };
    this.cpf = this.makeCPF(cpf);
  }

  componentDidMount() {
    const {
      match: {
        params: { cpf },
      },
    } = this.props;
    api
      .post('/api/chamado/read', { id_usuario: cpf })
      .then((res) => {
        this.setState({ chamado: res.data });
      })
      .catch((error) => {
        console.log(error);
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

  render() {
    const { chamado } = this.state;
    console.log(chamado);
    return (
      <>
        <MainHeader />
        <div className="chamados-cpf">
          <h1>Chamados por CPF</h1>
        </div>
        <TableContext.Provider
          value={{
            goToUrl: '/chamado',
            rowsPrimaryKey: 0,
            checkInfo: { 4: ['Em aberto', '/edit-chamado'] },
          }}
        >
          {chamado && (
            <Table
              title={` ${this.cpf}`}
              head={[
                '#',
                'Defeito',
                'Setor',
                'Status',
                'Técnico',
                'Última modificação',
                'Data de criação',
              ]}
              dateFields={[5]}
              columnSortKey={6}
              rows={chamado.map(value => [
                value.chamado.id,
                value.chamado.descricao,
                value.setor,
                value.situacao.nome,

                value.chamado.id_tecnico,

                value.chamado.data,
                value.ultimaAlteracao,
              ])}
            />
          )}
        </TableContext.Provider>
        <Footer />
      </>
    );
  }
}
/*
  value.id,
                  value.id,
                  value.descricao,
                  value.data,
                  value.ti,
                  value.tombo,
                  value.id_tecnico,
                  value.id_usuario,
                  value.id_setor,
*/
ChamadosCPF.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
