import React, { Component } from 'react';
import api from '../../../../../services/api';

export default class AtendimentoPrioridade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prioridades: null,
    };
  }

  componentDidMount() {
    api.get('/api/prioridade/read.php').then((res) => {
      // console.log(res.data);
      this.setState({ prioridades: res.data });
    });
  }

  render() {
    const { prioridades } = this.state;
    return (
      <>
        <strong>Prioridade</strong>
        <select id="prioridade" name="priority" className="admin-chamado">
          <option value="">{prioridades ? '-----' : 'Loading...'}</option>
          {(prioridades || []).map(prioridade => (
            <option value={prioridade.descricao} key={prioridade.descricao}>
              {prioridade.descricao}
            </option>
          ))}
        </select>
      </>
    );
  }
}
