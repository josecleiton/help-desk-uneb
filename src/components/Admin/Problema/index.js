import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../../services/api';

import AdminRightDiv from '../RightDiv';
import Button from '../../Button';
import ErrorAlert from '../../ErrorAlert';

export default class AdminProblema extends Component {
  constructor(props) {
    super(props);
    const {
      location: { state },
    } = props;
    this.valid = state && state.payload;
    this.state  = {
      error: '',
      success: '',
    }
  }

  handleVoltar = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleConfirmar = () => {
    const {
      location: {
        state: {
          payload: { id },
        },
      },
    } = this.props;
    const jwtToken = localStorage.getItem('HD7-AuthToken');
    api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    api
      .post('/api/problema/delete.php', { id })
      .then((res) => {
        if (!res.data.error) {
          this.setState({ error: '', success: 'Excluído com sucesso' }, () => {
            const { history } = this.props;
            setTimeout(() => {
              history.goBack();
            }, 1000);
          });
        } else {
          this.setState({ error: res.data.mensagem });
        }
      })
      .catch(() => {
        this.setState({ error: 'Erro no servidor' });
      });
  };

  render() {
    const { error, success } = this.state;
    return (
      <AdminRightDiv>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {success && <ErrorAlert className="success">{success}</ErrorAlert>}
        <center style={{ marginTop: '2%' }}>
          {this.valid && (
            <Button background="red" onClick={this.handleConfirmar}>
              Confirmar
            </Button>
          )}
          <Button onClick={this.handleVoltar}>Voltar</Button>
        </center>
      </AdminRightDiv>
    );
  }
}

AdminProblema.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
