/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import api from '../../../../services/api';

import AdminRightDiv from '../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../components/Admin/Title';
// import Deck from '../../../../components/Admin/Deck';
import AdminGerenciamentoForm from '../../../../components/Admin/Gerenciamento/Form';
import Table from '../../../../components/Table';
import TableContext from '../../../../components/Table/Context';
import ErrorAlert from '../../../../components/ErrorAlert';
import AtendimentoEncaminhar from '../../../../components/Admin/Atendimento/Form/Encaminhar';
import AdminContext from '../../../../components/Admin/Context';
import Loading from '../../../../components/Loading';

import '../../../../components/Admin/Atendimento/Form/style.css';

export default class GerenciamentoTecnicos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      tecnicos: null,
      errorForm: '',
    };
    this.admin = false;
  }

  componentDidMount() {
    const jwtToken = localStorage.getItem('HD7-AuthToken');
    api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    api
      .post('/api/tecnico/read.php')
      .then((res) => {
        // console.log(res.data);
        if (!res.data.error) {
          this.setState({ tecnicos: res.data });
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
    const inputsEl = document.querySelectorAll('input.input-form-main');
    const login = inputsEl[0].value;
    const nome = inputsEl[1].value;
    const email = inputsEl[2].value;
    const telefone = inputsEl[3].value;
    const selectsEl = document.querySelectorAll('select');
    const setor = selectsEl[0].options[selectsEl[0].selectedIndex].value;
    const cargo = selectsEl[1].options[selectsEl[1].selectedIndex].value;

    if (!nome || !email || !telefone || (!setor && this.admin)) {
      this.setState({ errorForm: 'Preencha todos os campos' });
      return;
    }

    const nomeReg = /^.*[0-9].*$/;
    if (nome && (nome.length === 1 || nomeReg.test(nome))) {
      this.setState({ errorForm: 'Nome muito curto ou com números' });
      return;
    }

    const telReg = /^[0-9]*$/;
    if (
      telefone
      && (!telReg.test(telefone) || (telefone.length !== 11 && telefone.length !== 10))
    ) {
      this.setState({ errorForm: 'Telefone é formado por 10 ou 11 números. Ex: 71981234567' });
    }

    const formData = {
      login,
      nome,
      email,
      telefone,
      setor,
    };
    let endpoint = '';
    switch (cargo) {
      case 'A':
        endpoint = '/api/admin/create.php';

        break;

      case 'G':
        endpoint = '/api/gerente/create.php';
        break;

      default:
        endpoint = '/api/tecnico/create.php';
        break;
    }
    console.log(endpoint);
    api
      .post(endpoint, formData)
      .then((res) => {
        if (!res.data.error) {
          this.setState({ errorForm: '', successForm: 'Técnico criado com sucesso' }, () => {
            const {
              history,
              location: { pathname },
            } = this.props;
            setTimeout(() => {
              history.push({ pathname: '/empty' });
              history.replace({ pathname });
            }, 1000);
          });
        } else {
          this.setState({ errorForm: res.data.mensagem });
        }
      })
      .catch(() => {
        this.setState({ error: 'Erro no servidor' });
      });
  };

  render() {
    const {
      tecnicos, error, errorForm, successForm,
    } = this.state;
    return (
      <AdminContext.Consumer>
        {(state) => {
          const {
            user: { cargo },
          } = state;
          this.admin = cargo === 'A';
          return (
            <AdminRightDiv>
              <AdminPageTitle comment="comentário">Técnico</AdminPageTitle>
              <AdminGerenciamentoForm
                handleSubmit={this.handleFormSubmit}
                buttonChildren={[
                  <>
                    Cadastrar novo Técnico
                    {' '}
                    <i className="fas fa-plus" />
                  </>,
                  <>
                    Insira os dados do técnico
                    {' '}
                    <i className="fas fa-arrow-down" />
                  </>,
                ]}
                inputForm={[
                  {
                    label: 'Login do técnico',
                    id: 'login',
                    tipo: 'text',
                    placeholder: 'insira o login do técnico',
                  },
                  {
                    label: 'Nome do técnico',
                    id: 'nome',
                    tipo: 'text',
                    placeholder: 'insira o nome do técnico',
                  },
                  {
                    label: 'Email do técnico',
                    id: 'Email',
                    tipo: 'email',
                    placeholder: 'insira o email do técnico',
                  },
                  {
                    label: 'Setor do técnico',
                    id: 'setor',
                    tipo: 'hidden',
                    placeholder: 'insira o setor do técnico',
                  },
                  {
                    label: 'Telefone',
                    id: 'tele',
                    tipo: 'number',
                    placeholder: 'Insira o telefone principal do setor',
                  },
                ]}
              >
                {this.admin && (
                  <div style={{ marginTop: 15 }}>
                    <AtendimentoEncaminhar select={false} />
                  </div>
                )}
                <div type="admin-chamado-input" style={{ marginTop: 15, marginBottom: 15 }}>
                  <strong>Cargo</strong>
                  <select id="cargos" className="admin-chamado">
                    <option value="">----</option>
                    <option value="G">Gerente</option>
                    {this.admin && <option value="A">Admin</option>}
                  </select>
                </div>
              </AdminGerenciamentoForm>
              {errorForm && <ErrorAlert>{errorForm}</ErrorAlert>}
              {successForm && <ErrorAlert className="success">{successForm}</ErrorAlert>}
              {/* <Deck
          cards={[
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
            { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/setor' },
          ]}
        /> */}
              {!error ? (
                tecnicos ? (
                  <TableContext.Provider
                    value={{ goToUrl: '/admin/gerenciamento/tecnico', rowsPrimaryKey: 0 }}
                  >
                    <Table
                      title="Técnicos"
                      head={['Login', 'Nome', 'Email', 'Cargo', 'Telefone', 'Setor']}
                      columnSortKey={0}
                      rows={tecnicos.map((tecnico) => {
                        const {
                          login, nome, email, cargo, telefone, setor,
                        } = tecnico;
                        return [
                          login,
                          nome,
                          email,
                          cargo,
                          telefone,
                          setor ? setor.nome : 'Não especificado',
                          tecnico,
                        ];
                      })}
                      margin="2% auto"
                    />
                  </TableContext.Provider>
                ) : (
                  <Loading />
                )
              ) : (
                <ErrorAlert>{error}</ErrorAlert>
              )}
            </AdminRightDiv>
          );
        }}
      </AdminContext.Consumer>
    );
  }
}
