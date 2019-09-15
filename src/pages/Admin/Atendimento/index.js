import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../../services/api';

import AdminRightDiv from '../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../components/Admin/Title';
import LargeBox from '../../../components/LargeBox';
import AtendimentoForm from '../../../components/Admin/Atendimento/Form';
import Table from '../../../components/Table';
import TableContext from '../../../components/Table/Context';
// import Content from './Content';
import Error from '../../../components/Error';

import './style.css';

/**
 * Página incompleta.
 * Função a ser implementada:
 * Acessar o banco de dados e selecionar o estado atual do chamado
 * A partir desse estado, chamar o form correspondente
 */

export default class Atendimento extends Component {
  constructor(props) {
    super(props);
    const {
      location: { state },
    } = props;
    this.state = {
      validAccess: state !== undefined,
      baseURL: api.defaults.baseURL,
    };
  }

  currentPath = () => {
    const {
      match: { path },
    } = this.props;
    return path.substr(0, path.lastIndexOf('/'));
  };

  render() {
    const {
      match: {
        params: { id },
      },
      location: { state },
    } = this.props;
    const { validAccess, baseURL } = this.state;
    let chamado = null;
    if (validAccess) {
      chamado = state.payload;
    }
    return (
      <AdminRightDiv>
        {validAccess ? (
          <>
            <AdminPageTitle>Atendimento de Chamado</AdminPageTitle>
            <LargeBox className="admin-atendimento-box-clicked">
              <div className="admin-atendimento-content">
                <h2>
                  {/* Número do Chamado: # */}
                  {`Código: ${id}`}
                </h2>
                <p>
                  <strong>Solicitante:</strong>
                  {` ${chamado.usuario.nome}`}
                  {/* user@email.com */}
                </p>
                <p>
                  <strong>Situação:</strong>
                  {` ${chamado.alteracoes[chamado.alteracoes.length - 1].situacao.nome}`}
                  {/* Aberto */}
                </p>
                <p>
                  <strong>Data de Abertura:</strong>
                  {` ${chamado.alteracoes[0].data}`}
                  {/* dd/mm/YYYY */}
                </p>

                <p>
                  <strong>Setor:</strong>
                  {` ${chamado.setor.nome}`}
                  {/* TI */}
                </p>
                {chamado.arquivo && (
                  <center>
                    <a
                      href={`${baseURL}/${chamado.arquivo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        alt={`Anexo do chamado ${chamado.id}`}
                        title={`Anexo do chamado ${chamado.id}`}
                        className="chamado"
                        src={`${baseURL}/${chamado.arquivo}`}
                      />
                    </a>
                  </center>
                )}
              </div>
              {chamado.alteracoes ? (
                <div>
                  <br />
                  <TableContext.Provider value={{}}>
                    <Table
                      title="Histórico de Movimentações"
                      head={['Situação', 'Descrição', 'Data']}
                      columnSortKey={2}
                      dateFields={[2]}
                      rows={chamado.alteracoes.map((ele) => {
                        const {
                          situacao: { nome: situacaoNome },
                          descricao,
                          data,
                        } = ele;
                        return [situacaoNome, descricao, data, {}];
                      })}
                    />
                  </TableContext.Provider>
                </div>
              ) : null}
            </LargeBox>
            <AtendimentoForm
              estado={chamado.alteracoes[chamado.alteracoes.length - 1].situacao.nome}
            />
          </>
        ) : (
          <Error icon="far fa-dizzy" title="Acesso não é permitido">
            {'O acesso direto a essa página não é permitido, retorne ao início pelo menu ou '}
            <Link to="/admin">clicando aqui</Link>
.
          </Error>
        )}
      </AdminRightDiv>
    );
  }
}

Atendimento.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
