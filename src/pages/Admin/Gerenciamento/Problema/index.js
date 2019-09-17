/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../../../services/api';
import AdminRightDiv from '../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../components/Admin/Title';
import Loading from '../../../../components/Loading';
import ErrorAlert from '../../../../components/ErrorAlert';
import TableContext from '../../../../components/Table/Context';
import Table from '../../../../components/Table';
import AdminGerenciamentoForm from '../../../../components/Admin/Gerenciamento/Form';

export default class GerenciamentoProblemas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problemas: null,
      error: '',
      errorForm: '',
      success: '',
    };
    this.admin = false;
  }

  componentDidMount() {
    const {
      location: { state },
    } = this.props;
    const jwtToken = localStorage.getItem('HD7-AuthToken');
    api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    if (state && state.setor) {
      // console.log(state.setor.problemas[0].descricao);
      this.admin = true;
      this.setState({ setor: state.setor });
    } else {
      api
        .post('/api/setor/read.php')
        .then((res) => {
          console.log(res.data);
          console.log("LOLA");
          if (!res.data.error) {
            this.setState({ setor: res.data });
          } else {
            this.setState({ error: res.data.mensagem });
          }
        })
        .catch(() => {
          this.setState({ error: 'Erro no servidor' });
        });
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const descricao = document.querySelector('input.input-form-main').value;
    if (!descricao || descricao.length < 10) {
      this.setState({ errorForm: 'Preencha o problema com uma descrição maior que 10 caracteres' });
      return;
    }
    const { setor } = this.state;
    api
      .post('/api/problema/create.php', { descricao, setor: this.admin ? setor.cod : '' })
      .then((res) => {
        if (!res.data.error) {
          this.setState({ errorForm: '', success: 'Problema criado no setor' }, () => {
            const {
              history,
              location: { pathname },
            } = this.props;
            setTimeout(() => {
              // history.push({ pathname: '/empty' });
              // history.replace({ pathname });
              history.goBack();
            }, 1000);
          });
        } else {
          this.setState({ errorForm: res.data.mensagem });
        }
      })
      .catch(() => {
        this.setState({ errorForm: 'Erro no servidor' });
      });
  };

  render() {
    const {
      error, errorForm, success, setor,
    } = this.state;
    return (
      <AdminRightDiv>
        {!error ? (
          setor ? (
            <>
              <AdminPageTitle comment={setor.nome}>Problemas</AdminPageTitle>

              <AdminGerenciamentoForm
                handleSubmit={this.handleFormSubmit}
                buttonChildren={[
                  <>
                    Criar novo problema
                    <i className="fas fa-plus" />
                  </>,
                  <>
                    Insira os dados do setor
                    <i className="fas fa-arrow-down" />
                  </>,
                ]}
                inputForm={[
                  {
                    label: 'Descrição problema',
                    id: 'descricao-problema',
                    tipo: 'text',
                    placeholder: 'Insira a descrição do problema',
                    required: true,
                  },
                ]}
              />
              {success && <ErrorAlert className="success">{success}</ErrorAlert>}
              {errorForm && <ErrorAlert>{errorForm}</ErrorAlert>}
              <br />
              <center>Clique em um problema para excluí-lo</center>
              <TableContext.Provider
                value={{ goToUrl: '/admin/gerenciamento/delete-problema', rowsPrimaryKey: 0 }}
              >
                <Table
                  margin="1.5% auto"
                  columnSortKey={0}
                  head={['#', 'Descrição']}
                  rows={(setor.problemas || []).map(problema => [
                    problema.id,
                    problema.descricao,
                    problema,
                  ])}
                />
              </TableContext.Provider>
            </>
          ) : (
          // <TableContext.Provider value={{goToUrl: '/admin/problema/delete'}}>
          // </TableContext.Provider>

            <Loading />
          )
        ) : (
          <ErrorAlert>{error}</ErrorAlert>
        )}
      </AdminRightDiv>
    );
  }
}

GerenciamentoProblemas.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
