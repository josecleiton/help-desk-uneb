/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class AdminTable extends Component {
  render() {
    const { title, top } = this.props;
    return (
      <div style={{ marginTop: top }} className="admin-table-wrap">
        <table className="admin">
          <Fragment>{title ? <caption>Chamados em aberto</caption> : ''}</Fragment>
          <thead>
            <tr>
              <td>Prioridade</td>
              <td>Área</td>
              <td>Problema</td>
              <td>Data de Criação</td>
              <td>Solicitante</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Baixa</td>
              <td>TI</td>
              <td>Java bugou</td>
              <td>dd/mm/YYYY</td>
              <td>brancobro@yahoo.com.br</td>
            </tr>
            <tr>
              <td>Alta</td>
              <td>TI</td>
              <td>Impressora sem papel</td>
              <td>dd/mm/YYYY</td>
              <td>rafamoreira@777.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

AdminTable.defaultProps = {
  title: false,
  top: '0',
};

AdminTable.propTypes = {
  title: PropTypes.bool,
  top: PropTypes.string,
};
