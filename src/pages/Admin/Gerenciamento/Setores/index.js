/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../../../services/api';

import AdminRightDiv from '../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../components/Admin/Title';
import Deck from '../../../../components/Admin/Deck';
import AdminGerenciamentoForm from '../../../../components/Admin/Gerenciamento/Form';
import ErrorAlert from '../../../../components/ErrorAlert';
import './style.css';

export default class GerenciamentoSetores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setores: null,
      error: null,
      success: '',
      errorForm: '',
    };
  }

  componentDidMount() {
    const jwtToken = localStorage.getItem('HD7-AuthToken');
    api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    api
      .post('/setor/read.php')
      .then((res) => {
        // console.log(res.data);
        if (!res.data.error) {
          this.setState({ setores: res.data });
        } else {
          this.setState({ error: res.data.mensagem });
        }
      })
      .catch(() => {
        this.setState({ error: 'Erro no servidor.' });
      });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const inputsEl = document.querySelectorAll('form[class="admin"] input');
    const nomeReg = /^.*[0-9].*$/;
    const telReg = /^[0-9]*$/;
    if (nomeReg.test(inputsEl[0].value)) {
      this.setState({ errorForm: 'Nome mal formado' });
      return;
    }
    const tel = inputsEl[1].value;
    if ((tel.length !== 10 && tel.length !== 11) || !telReg.test(tel)) {
      this.setState({ errorForm: 'Telefone mal formado' });
      return;
    }
    this.setState({ errorForm: '' });
    const formData = {
      nome: inputsEl[0].value,
      telefone: inputsEl[1].value,
      email: inputsEl[2].value,
    };

    // console.log(formData);
    api.post('/setor/create.php', formData).then((res) => {
      if (!res.data.error) {
        this.setState({ success: 'Setor criado com sucesso' });
        const {
          history,
          location: { pathname },
        } = this.props;
        setTimeout(() => {
          history.push({ pathname: '/empty' });
          history.replace({ pathname });
        }, 1300);
      } else {
        this.setState({ error: res.data.mensagem });
      }
    });
  };

  render() {
    const {
      setores, error, errorForm, success,
    } = this.state;
    return (
      <AdminRightDiv>
        <AdminPageTitle comment="comentário">Setores</AdminPageTitle>
        <AdminGerenciamentoForm
          handleSubmit={this.handleFormSubmit}
          buttonChildren={[
            <>
              Criar novo setor
              <i className="fas fa-plus" />
            </>,
            <>
              Insira os dados do setor
              <i className="fas fa-arrow-down" />
            </>,
          ]}
          inputForm={[
            {
              label: 'Nome do setor',
              id: 'setor-nome',
              tipo: 'text',
              placeholder: 'insira o nome do setor',
              required: true,
            },
            {
              label: 'Telefone',
              id: 'setor-telefone',
              tipo: 'text',
              placeholder: 'Insira o telefone principal do setor',
              required: true,
            },
            {
              label: 'Email',
              id: 'setor-email',
              tipo: 'email',
              placeholder: 'Insira o email do setor',
              required: true,
            },
          ]}
        />
        {success && <ErrorAlert className="success">{success}</ErrorAlert>}
        {errorForm && <ErrorAlert>{errorForm}</ErrorAlert>}

        {!error ? (
          setores ? (
            <Deck
              cards={setores.map(setor => ({
                info: { title: setor.nome, subTitle: setor.email },
                url: '/admin/gerenciamento/setor',
                payload: setor,
              }))}
              maxCardsPerPage={8}
            />
          ) : (
            <div>Loading...</div>
          )
        ) : (
          <ErrorAlert>{error}</ErrorAlert>
        )}
      </AdminRightDiv>
    );
  }
}

GerenciamentoSetores.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
