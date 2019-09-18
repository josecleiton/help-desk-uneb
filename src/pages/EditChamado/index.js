import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import api from '../../services/api';
import MainHeader from '../../components/Main/Header';
import Footer from '../../components/Footer';
import ErrorAlert from '../../components/ErrorAlert';
import Button from '../../components/Button';

export default class EditChamado extends Component {
  constructor(props) {
    super(props);
    const {
      location: { state },
    } = this.props;
    this.initialSeconds = 10;
    this.state = {
      validAccess: state ? state.from !== undefined : false,
      seconds: this.initialSeconds,
      mensagem: '',
    };
  }

  componentDidMount() {
    let timeLeft = this.initialSeconds;
    this.timer = setInterval(() => {
      timeLeft -= 1;
      if (!timeLeft) {
        this.visualizar();
      }
      this.setState({ seconds: timeLeft });
    }, 1000);
  }

  componentWillUnmount() {
    const { mensagem } = this.state;
    if (!mensagem) clearInterval(this.timer);
  }

  visualizar = () => {
    const {
      history: { push: redirectTo },
      match: {
        params: { id },
      },
      location,
    } = this.props;
    const {
      state: { payload },
    } = location;
    redirectTo({ pathname: `/chamado/${id}`, state: { from: location, payload } });
  };

  excluir = () => {
    const {
      history: { replace: redirectTo },
      match: {
        params: { id },
      },
    } = this.props;
    clearInterval(this.timer);
    // console.log({ id });
    api.post('/chamado/delete.php', { id }).then((res) => {
      const {
        data: { mensagem },
      } = res;
      this.setState({ mensagem });
      setTimeout(() => {
        redirectTo('/');
      }, 2000);
    });
  };

  render() {
    const {
      match: {
        params: { id },
      },
      location,
    } = this.props;
    const { seconds, validAccess, mensagem } = this.state;
    return (
      <>
        <MainHeader />
        {validAccess ? (
          <div className="wrapper">
            <h4 style={{ marginBottom: '2%' }}>
              {`Clique em visualizar ou espere ${seconds} segundos para ser redirecionado...`}
            </h4>
            <h1>
              {`Deseja excluir o chamado ${id}?`}
              <div className="edit-chamado-button">
                <Button onClick={this.visualizar}>visualizar</Button>
                <Button background="red" onClick={this.excluir}>
                  excluir
                </Button>
              </div>
              {mensagem && <ErrorAlert>{mensagem}</ErrorAlert>}
            </h1>
          </div>
        ) : (
          <Redirect to={{ pathname: '/acesso-invalido', state: { from: location } }} />
        )}
        <Footer />
      </>
    );
  }
}

EditChamado.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
