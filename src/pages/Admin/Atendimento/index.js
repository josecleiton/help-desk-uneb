/* eslint-disable no-nested-ternary */
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
import Loading from '../../../components/Loading';

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

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    api.post('/chamado/read.php', { id }).then((res) => {
      // console.log(res.data);
      if (!res.data.error) {
        this.setState({ chamado: res.data });
      }
    });
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
      // location: { state },
    } = this.props;
    const { validAccess, baseURL, chamado } = this.state;
    return (
      <AdminRightDiv>
        {validAccess ? (
          chamado ? (
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
                  {chamado.software && (
                    <div>
                      <p>
                        <strong>Software:</strong>
                        {` ${chamado.software}`}
                      </p>
                      <p>
                        <strong>Data Utilização:</strong>
                        {` ${chamado.data_utilizacao}`}
                      </p>
                      <p>
                        <a href={chamado.link} target="_blank" rel="noopener noreferrer">
                          <strong>Link</strong>
                        </a>
                      </p>
                      <p>
                        <strong>Sala:</strong>
                        {chamado.sala === '1' ? ' LAMI1' : ' LAMI2'}
                      </p>
                      <p>
                        <strong>Plugins:</strong>
                        {` ${chamado.plugins}`}
                      </p>
                    </div>
                  )}
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
          )
        ) : (
          <Loading />
        )}
      </AdminRightDiv>
    );
  }
}

Atendimento.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
