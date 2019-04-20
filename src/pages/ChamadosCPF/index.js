import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import MainHeader from '../../components/Main/Header';
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
  }

  makeCPF = (toCPF) => {
    let cpf = '';
    const delimeters = '..-';
    for (let i = 0, j = 0; i < toCPF.length; i += 3) {
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
    return (
      <Fragment>
        <MainHeader />
        <div className="chamados-cpf">
          <h1>Chamados por CPF</h1>
        </div>
        <Table
          title={` ${this.cpf}`}
          goToUrl="/chamado"
          head={[
            '#',
            'Equipamento',
            'Defeito',
            'Setor',
            'Status',
            'Técnico',
            'Última modificação',
            'Data de criação',
          ]}
          rowsPrimaryKey={0}
          dateFields={[6, 7]}
          columnSortKey={6}
          checkInfo={{ 4: ['Em aberto', '/edit-chamado'] }}
          rows={[
            [
              '19001',
              'Computador Colegiado SI',
              'Java bugou',
              'TI',
              'Em atendimento',
              'Cleiton',
              '10/04/2019 02:00',
              '17/03/2018 00:00',
            ],
            [
              '19002',
              'Computador Colegiado SI',
              'Impressora parou',
              'TI',
              'Em aberto',
              'Cleiton',
              '15/04/2019 11:00',
              '10/04/2019 22:00',
            ],
          ]}
        />
        <Footer />
      </Fragment>
    );
  }
}

ChamadosCPF.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
