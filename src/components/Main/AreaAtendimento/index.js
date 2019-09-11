import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import api from '../../../services/api';

import ErrorAlert from '../../ErrorAlert';

import './style.css';

class AreaAtendimento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false,
      error: false,
      loading: true,
      setores: null,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
    api.post('/api/setor/read.php').then((res) => {
      const { data: setores } = res;
      this.setState({ loading: false, setores });
      console.log(setores);
    });
  }

  handleSubmit = () => {
    const valSelect = document.querySelector('select[name=area]').value;
    if (valSelect) {
      const {
        history: { push: redirectTo },
        location,
      } = this.props;
      this.setState({ error: false });
      redirectTo({ pathname: `/abrir-chamado/${valSelect}`, state: { from: location } });
    } else {
      this.setState({ error: true });
    }
  };

  getSetores = (setores) => {
    const setoresFormatados = [
      <option value="" key={-1}>
        Selecione
      </option>,
    ];
    setores.forEach((element) => {
      setoresFormatados.push(
        <option value={element.nome} key={element.cod}>
          {element.nome}
        </option>,
      );
    });
    return setoresFormatados;
  };

  render() {
    const {
      animate, error, loading, setores,
    } = this.state;
    return loading ? (
      <>
        <div>Loading...</div>
      </>
    ) : (
      <>
        <div className="setor-chamado" style={{ opacity: animate ? 1 : 0 }}>
          <h2>SETOR DE ATENDIMENTO</h2>
          <div>
            <select name="area">{this.getSetores(setores)}</select>
            <button type="submit" onClick={this.handleSubmit}>
              Confirmar
            </button>
          </div>
        </div>
        {error && (
          <ErrorAlert className="error-area-atendimento">Selecione o setor desejado.</ErrorAlert>
        )}
      </>
    );
  }
}

AreaAtendimento.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(AreaAtendimento);
