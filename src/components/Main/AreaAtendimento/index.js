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
      setores: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animate: true });
    }, 50);
    api
      .get('/api/setor/read')
      .then((res) => {
        this.setState({ setores: res.data });
      })
      .catch((error) => {
        console.log(error);
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

  render() {
    const { animate, error, setores } = this.state;
    return (
      <>
        <div className="setor-chamado" style={{ opacity: animate ? 1 : 0 }}>
          <h2>SETOR DE ATENDIMENTO</h2>
          <div>
            <select name="area">
              <option value="">Selecione o setor</option>
              {setores.map(value => (
                <option value={value.nome} key={value.nome}>
                  {value.nome}
                </option>
              ))}
            </select>
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
