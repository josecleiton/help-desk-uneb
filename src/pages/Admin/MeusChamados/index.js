/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../../services/api';

import AdminContext from '../../../components/Admin/Context';
import AdminTitle from '../../../components/Admin/Title';
import AdminRightDiv from '../../../components/Admin/RightDiv';
import TableContext from '../../../components/Table/Context';
import AdminGerenciamentoForm from '../../../components/Admin/Gerenciamento/Form';

import Table from '../../../components/Table';
import ErrorAlert from '../../../components/ErrorAlert';

export default class AdminMeusChamados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: 0,
      error: '',
      chamados: [],
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  shouldComponentUpdate(prevProps, prevState) {
    const {
      match: {
        params: { selection },
      },
    } = this.props;
    const { loaded } = this.state;
    return selection !== prevProps.match.params.selection || loaded !== prevState.loaded;
  }

  componentDidUpdate() {
    this.getInfo();
  }

  getInfo = () => {
    const requestBody = { tecnico: true };
    const {
      match: {
        params: { selection },
      },
    } = this.props;
    if (selection && selection !== 'Todos') {
      requestBody.situacao = selection;
    }
    const jwtToken = localStorage.getItem('HD7-AuthToken');
    api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    // console.log(api);
    api
      .post('/api/chamado/read.php', requestBody)
      .then((res) => {
        if (!res.data.error) {
          this.setState({ chamados: res.data, loaded: true, error: '' }, () => {
            const { chamados } = this.state;
            console.log(chamados);
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
    const { loaded, error, chamados } = this.state;
    const { location } = this.props;
    // console.log(chamados);
    console.log('KKKK');
    return (
      <AdminRightDiv>
        <AdminTitle comment="comentário">Meus Chamados</AdminTitle>
        <AdminGerenciamentoForm
          handleSubmit={this.handleFormSubmit}
          buttonChildren={[
            <>
              Buscar chamado
              {' '}
              <i className="fas fa-plus" />
            </>,
            <>
              Preencha a busca e a forma de busca
              {' '}
              <i className="fas fa-arrow-down" />
            </>,
          ]}
          selectForm={[
            {
              label: 'Buscar por:',
              id: 'setor',
              option: [
                {
                  nome: '',
                  value: '',
                },
                {
                  nome: 'Área',
                  value: 'area',
                },
                {
                  nome: 'Situação',
                  value: 'situacao',
                },
                {
                  nome: 'problema',
                  value: 'problema',
                },
                {
                  nome: 'Qtd de dias',
                  value: 'qtd_de_dia',
                },
                {
                  nome: 'data de abertura',
                  value: 'data_abertura',
                },
                {
                  nome: 'Solicitante',
                  value: 'solicitante',
                },
              ],
            },
          ]}
          inputForm={[
            {
              label: 'Chamado',
              id: 'chamado',
              tipo: 'text',
              placeholder: 'Informe o dado do chamado',
            },
          ]}
        />

        {!error ? (
          loaded ? (
            <AdminContext.Consumer key={location.pathname}>
              {(state) => {
                let {
                  user: { nome },
                } = state;
                nome = nome.substr(0, nome.indexOf(' '));
                // console.log(this.chamados);
                return (
                  <TableContext.Provider
                    value={{ goToUrl: '/admin/atendimento', rowsPrimaryKey: 0 }}
                  >
                    <Table
                      title={`Chamados de ${nome}`}
                      margin="1.5% auto"
                      maxRowsPerPage={10}
                      columnSortKey={6}
                      dateFields={[6]}
                      head={[
                        '#',
                        'Setor',
                        'Prioridade',
                        'Situação',
                        'Problema',
                        'Qtd de dias',
                        'Data de Abertura',
                        'Solicitante',
                      ]}
                      // rows={chamados.map((el) => {
                      //   // console.log(el);
                      //   return [
                      //     id,
                      //     setorNome,
                      //     prioridade,
                      //     problema ? problema.descricao : 'Não especificado',
                      //     qtdDias,
                      //     data,
                      //     usuarioNome,
                      //   ];
                      // })}
                      rows={(chamados || []).map((el) => {
                        // console.log(el);
                        const {
                          id,
                          setor: { nome: setorNome },
                          usuario: { nome: usuarioNome },
                          alteracoes,
                          descricao,
                        } = el;
                        const { data } = alteracoes[0];
                        const prioridade = alteracoes[alteracoes.length - 1].prioridade.descricao;
                        const situacao = alteracoes[alteracoes.length - 1].situacao.nome;
                        const qtdDias = Math.floor((new Date() - new Date(data)) / (86400 * 1000));
                        return [
                          id,
                          setorNome,
                          prioridade,
                          situacao,
                          descricao,
                          qtdDias,
                          data,
                          usuarioNome,
                        ];
                      })}
                    />
                  </TableContext.Provider>
                );
              }}
            </AdminContext.Consumer>
          ) : (
            <>Loading</>
          )
        ) : (
          <ErrorAlert>{error}</ErrorAlert>
        )}
      </AdminRightDiv>
    );
  }
}

AdminMeusChamados.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
