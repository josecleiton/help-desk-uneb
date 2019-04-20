import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import MainHeader from '../../components/Main/Header';
import Footer from '../../components/Footer';
import ErrorAlert from '../../components/ErrorAlert';

export default class EditChamado extends Component {
  constructor(props) {
    super(props);
    const {
      location: { state },
    } = this.props;
    this.initialSeconds = 10;
    this.deleted = false;
    this.state = {
      validAccess: state !== undefined,
      excluido: this.deleted,
      seconds: this.initialSeconds,
    };
  }

  componentDidMount() {
    let timeLeft = this.initialSeconds;
    this.timer = setInterval(() => {
      timeLeft -= 1;
      if (!timeLeft) {
        clearInterval(this.timer);
        this.visualizar();
      }
      this.setState({ seconds: timeLeft });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  visualizar = () => {
    const {
      history: { push: redirectTo },
      match: {
        params: { id },
      },
    } = this.props;
    redirectTo(`/chamado/${id}`);
  };

  excluir = () => {
    const {
      history: { replace: redirectTo },
    } = this.props;
    clearInterval(this.timer);
    this.setState({ excluido: true });
    setTimeout(() => {
      redirectTo('/');
    }, 2000);
  };

  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { seconds, validAccess, excluido } = this.state;
    return (
      <Fragment>
        <MainHeader />
        {validAccess ? (
          <div className="wrapper">
            <h4 style={{ marginBottom: '2%' }}>
              Clique em visualizar ou espere
              {'  '}
              {seconds}
              {'  '}
              segundos para ser redirecionado...
            </h4>
            <h1>
              Deseja excluir o chamado
              {'  '}
              {id}
              {' '}
?
              <div className="edit-chamado-button">
                <button type="button" onClick={this.visualizar}>
                  visualizar
                </button>
                <button type="button" onClick={this.excluir}>
                  excluir
                </button>
              </div>
              {excluido ? <ErrorAlert>Chamado excluído!</ErrorAlert> : ''}
            </h1>
          </div>
        ) : (
          <Redirect to="/acesso-invalido" />
        )}
        <Footer />
      </Fragment>
    );
  }
}

EditChamado.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
