import React, { Component, Fragment } from 'react';
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
    this.state = {
      validAccess: state !== undefined,
      excluido: false,
    };
  }

  /*
  componentDidMount() {

    const {
      location: { state },
    } = this.props;
    if (state) console.log(state.from);
  }
  */
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
    const { validAccess, excluido } = this.state;
    return (
      <Fragment>
        <MainHeader />
        {validAccess ? (
          <div className="wrapper">
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
