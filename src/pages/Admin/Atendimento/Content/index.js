import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HistoricoMovimentacao from '../../../../components/HistoricoChamado';
import api from '../../../../services/api';

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      information: null,
      chamado: [],
      chamadoURL: window.location.href.split('/'),
    };
  }

  componentDidMount() {
    const { chamadoURL } = this.state;
    const id = chamadoURL[5];
    api
      .post('/api/chamado/called', { id })
      .then((res) => {
        this.setState({ chamado: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { information, chamado, chamadoURL } = this.state;
    console.log(chamado);
    return (
      <div className="admin-atendimento-content">
        <strong>
          Número do chamado:
          {chamadoURL[5]}
        </strong>
        {chamado.map(called => (
          <div>
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
            </p>

            <p>
              <strong>Anexo:</strong>
              {' '}
Ver imagem
            </p>
          </div>
        ))}

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
              {chamado.map(value => value.movimentacao.map((called, index) => (
                <tr>
                  <th>{index}</th>
                  <td>{called.descricao}</td>
                  <td>{called.situacao}</td>
                  <td>{called.tecnico}</td>
                  <td>{called.prioridade}</td>
                  <td>{called.data}</td>
                </tr>
              )))}
            </tbody>
          </table>
        </HistoricoMovimentacao>
      </div>
    );
  }
}
Content.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Content;
