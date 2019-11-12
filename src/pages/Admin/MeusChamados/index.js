import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../../services/api';

import AdminTitle from '../../../components/Admin/Title';
import AdminRightDiv from '../../../components/Admin/RightDiv';
import TableContext from '../../../components/Table/Context';
import AdminGerenciamentoForm from '../../../components/Admin/Gerenciamento/Form';

import Table from '../../../components/Table';

export default class AdminMeusChamados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chamado: null,
      result: null,
      setor: [],
    };
  }

  componentDidMount() {
    api
      .get('/api/chamados')
      .then((res) => {
        // console.log(res.data);
        this.setState({ chamado: res.data, result: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
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
      this.setState({ result: null });
      this.setState({ result: called });
    } else {
      this.setState({ result: null });
      this.setState({ result: chamado });
    }
  };

  currentPath = () => {
    const {
      match: { path },
    } = this.props;
    return path;
  };

  handleFormSubmit = (e) => {
    console.log(e);
  };

  render() {
    const { result, setor } = this.state;
    return (
      <AdminRightDiv>
        <AdminTitle comment="comentário">Meus Chamados</AdminTitle>
        <TableContext.Provider value={{ goToUrl: '/admin/atendimento', rowsPrimaryKey: 0 }}>
          <AdminGerenciamentoForm
            handleClick={called => this.searchCalled(called)}
            url="encaminharChamado"
            ButtonText="Buscar"
            buttonChildren={[
              <>
                Buscar chamado
                {' '}
                <i className="fas fa-plus" />
              </>,
              <>
                Preencha a busca
                {' '}
                <i className="fas fa-arrow-down" />
              </>,
            ]}
            inputForm={[
              {
                label: 'Número do Chamado',
                id: 'chamado',
                nome: 'id',
                tipo: 'text',
                placeholder: 'Informe o dado do chamado',
              },
            ]}
            selectForm={[
              {
                label: 'Buscar Chamado',
                id: 'situacao',
                nome: 'situacao',
                option: [
                  {
                    nome: 'todos os Chamados',
                    value: '',
                  },
                  {
                    nome: 'Chamados pendente',
                    value: 'pendente',
                  },
                  {
                    nome: 'Chamados fechado',
                    value: 'Chamados fechado',
                  },
                  {
                    nome: 'Chamados em Aguardo',
                    value: 'em aguardo',
                  },
                ],
              },
            ]}
          />

          {result && (
            <Table
              title="Chamados"
              margin="1.5% auto"
              columnSortKey={5}
              dateFields={[6]}
              head={[
                '#',
                'Área',
                'Situação',
                'Problema',
                'Qtd de dias',
                'Data de Abertura',
                'Solicitante',
              ]}
              maxRowsPerPage={10}
              rows={result.map(value => [
                value.id,
                value.setor.map(nomeSetor => nomeSetor.nome),
                value.situacao,
                value.descricao,
                value.QtdDias,
                value.data,
                value.usuario.map(nomeUser => nomeUser.nome),
              ])}
            />
          )}
        </TableContext.Provider>
      </AdminRightDiv>
    );
  }
}

AdminMeusChamados.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
