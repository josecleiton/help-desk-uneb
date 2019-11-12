import React, { Component } from 'react';

import AtendimentoContext from '../../Context';
import AtendimentoOption from '../../Option';
import TextArea from '../../../../TextArea';
import AtendimentoTombamento from '../Tombamento';
import AtendimentoEncaminhar from '../Encaminhar';
import ErrorAlert from '../../../../ErrorAlert';
import api from '../../../../../services/api';

import AdminGerenciamentoForm from '../../../Gerenciamento/Form';
/*
  CLASS NÃO FINALIZADA PORQUE FALTA BACKEND,
  TRATAR: FAZER LOCK NO CHAMADO ASSIM QUE ALGUÉM CLICAR NELE NA TABELA DE
  CHAMADOS EM ABERTO
*/

export default class AtendimentoFormEmAberto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tombamento: false,
      encaminhar: false,
      error: '',
      setor: [],
    };
  }

  componentDidMount() {
    api
      .get('api/setor/read')
      .then((res) => {
        // console.log(res.data);
        this.setState({ setor: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  searchCalled = (called) => {
    console.log(called);
    const { chamado } = this.state;

    if (called) {
      setTimeout(alert('Operação realizada com sucesso'), 2000);
      window.location.reload();
    } else {
      setTimeout(alert('Falha na operação'), 2000);
    }
  };

  render() {
    const { setor } = this.state;
    return (
      <AtendimentoContext.Consumer>
        {(state) => {
          const { id: chamadoId } = state;
          return (
            <div className="admin-chamado-wrapper">
              <h1 className="admin-chamado">
Atendimento #
                {chamadoId}
              </h1>
              <AdminGerenciamentoForm
                handleClick={called => this.searchCalled(called)}
                url="encaminharChamado"
                widthButton="20%"
                valueURl={chamadoId}
                ButtonText="alterar"
                buttonChildren={[
                  <>
                    Encaminhar chamado?
                    {' '}
                    <i className="fas fa-plus" />
                  </>,
                  <>
                    Preencha os campos
                    {' '}
                    <i className="fas fa-arrow-down" />
                  </>,
                ]}
                selectForm={[
                  {
                    label: 'TRANSFERIR PARA: ',
                    id: 'transferir',
                    nome: 'setor',
                    option: setor.map(called => ({
                      nome: called.nome,
                    })),
                  },
                ]}
              />
              <AdminGerenciamentoForm
                handleClick={called => this.searchCalled(called)}
                url="definirTombo"
                widthButton="20%"
                valueURl={chamadoId}
                ButtonText="Salvar"
                buttonChildren={[
                  <>
                    Tombamento de Patrimônio
                    {' '}
                    <i className="fas fa-plus" />
                  </>,
                  <>
                    Preencha os campos
                    {' '}
                    <i className="fas fa-arrow-down" />
                  </>,
                ]}
                inputForm={[
                  {
                    label: 'TOMBO DO EQUIPAMENTO',
                    id: 'tombo',
                    nome: 'tombo',
                    tipo: 'number',
                    placeholder: 'Informe Número do tombo do equipamento',
                  },
                ]}
              />
              <AdminGerenciamentoForm
                handleClick={called => this.searchCalled(called)}
                url="alterarSituacao"
                widthButton="20%"
                valueURl={chamadoId}
                ButtonText="Salvar"
                buttonChildren={[
                  <>
                    Prioridade do chamado
                    {' '}
                    <i className="fas fa-plus" />
                  </>,
                  <>
                    Preencha os campos
                    {' '}
                    <i className="fas fa-arrow-down" />
                  </>,
                ]}
                selectForm={[
                  {
                    label: 'PRIORIDADE: ',
                    id: 'prioridade',
                    nome: 'prioridade',
                    option: [
                      {
                        nome: '',
                        value: '',
                      },
                      {
                        nome: 'alta',
                        value: 3,
                      },
                      {
                        nome: 'baixa',
                        value: 1,
                      },
                      {
                        nome: 'media',
                        value: 2,
                      },
                    ],
                  },
                ]}
              />
              <AdminGerenciamentoForm
                handleClick={called => this.searchCalled(called)}
                url="informacaoChamado"
                widthButton="20%"
                valueURl={chamadoId}
                ButtonText="Salvar"
                buttonChildren={[
                  <>
                    Informações adicionais
                    {' '}
                    <i className="fas fa-plus" />
                  </>,
                  <>
                    Preencha os campos
                    {' '}
                    <i className="fas fa-arrow-down" />
                  </>,
                ]}
                inputForm={[
                  {
                    label: 'Informações adicionais',
                    id: 'alteracoes',
                    nome: 'alteracoes',
                    tipo: 'text',
                    placeholder: 'Informações adicionais do chamado',
                  },
                ]}
              />
            </div>
          );
        }}
      </AtendimentoContext.Consumer>
    );
  }
}
