/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableRow from './Row';

import './style.css';

export default class AdminTable extends Component {
  render() {
    const { title, margin, link } = this.props;
    return (
      <div className="admin-table-wrapper">
        <table className="admin" style={{ margin }}>
          <caption>{title ? 'Chamados em aberto' : ''}</caption>
          <thead>
            <tr>
              <td>#</td>
              <td>Área</td>
              <td>Situação</td>
              <td>Problema</td>
              <td>Qtd de dias</td>
              <td>Data de Abertura</td>
              <td>Solicitante</td>
            </tr>
          </thead>
          <tbody>
            <TableRow
              link={link}
              elements={[
                '190002',
                'TI',
                'Em aberto',
                'Java bugou',
                'X',
                'dd/mm/YYYY',
                'brancobro@yahoo.com.br',
              ]}
            />
            <TableRow
              link={link}
              elements={[
                '190002',
                'TI',
                'Em atendimento',
                'Impressora sem papel',
                'X',
                'dd/mm/YYYY',
                'rafamoreira@777.com',
              ]}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

AdminTable.defaultProps = {
  title: false,
  margin: '0 auto',
  link: false,
};

AdminTable.propTypes = {
  title: PropTypes.bool,
  margin: PropTypes.string,
  link: PropTypes.bool,
};
