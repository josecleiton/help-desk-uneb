import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import {withRouter} from 'react-router-dom';
import api from '../../../../services/api';

import ErrorAlert from '../../../ErrorAlert';
import AtendimentoOption from '../../Atendimento/Option';
import Input from '../../../Input';
import AtendimentoEncaminhar from '../../Atendimento/Form/Encaminhar';

import '../../Atendimento/Form/style.css';
// import './style.css'
const inputStyle = {
  border: '1px solid rgba(0,0,0,0.4)',
  margin: '10px auto',
  padding: '3px',
  fontSize: '14px',
};

export default class GerenciamentoTecnicoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remove: false,
      update: false,
      success: '',
      error: '',
    };

    const jwtToken = localStorage.getItem('HD7-AuthToken');
    api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { remove } = this.state;
    const {
      tecnico: { login },
    } = this.props;
    const formData = { login };
    let endpoint = '/api/tecnico/';
    // console.log('submit', remove);
    if (!remove) {
      endpoint += 'update.php';
      const inputEl = document.querySelectorAll('div.admin-chamado-input input');
      const nome = inputEl[1].value;
      const telefone = inputEl[2].value;
      const email = inputEl[3].value;
      const setoresEl = document.getElementById('encaminha-setor');
      let setor = false;
      if (setoresEl) {
        const setorNome = setoresEl.options[setoresEl.selectedIndex].value;
        formData.setor = setorNome;
        setor = true;
      }
      if (!nome && !telefone && !email && !setor) {
        this.setState({ error: 'Ao menos um campo deve ser preenchido' });
        return;
      }
      const nomeReg = /^.*[0-9].*$/;
      if (nome && (nome.length === 1 || nomeReg.test(nome))) {
        this.setState({ error: 'Nome muito curto ou com números' });
        return;
      }

      const telReg = /^[0-9]*$/;
      if (
        telefone
        && (!telReg.test(telefone) || (telefone.length !== 11 && telefone.length !== 10))
      ) {
        this.setState({ error: 'Telefone é formado por 10 ou 11 números. Ex: 71981234567' });
        return;
      }
      formData.nome = nome;
      formData.telefone = telefone;
      formData.email = email;
    } else {
      endpoint += 'delete.php';
      // console.log(formData);
    }
    // console.log(formData);
    api
      .post(endpoint, formData)
      .then((res) => {
        if (!res.data.error) {
          this.setState({ error: '', success: res.data.mensagem });
          const { history } = this.props;
          setTimeout(() => {
            history.push('/admin/gerenciamento/tecnicos');
          }, 1000);
        } else {
          this.setState({ error: res.data.mensagem });
        }
      })
      .catch(() => {
        this.setState({ error: 'Erro no servidor' });
      });
  };

  handleUpdate = (checked) => {
    this.setState({ update: checked });
  };

  handleRemove = (checked) => {
    this.setState({ remove: checked });
  };

  render() {
    const { tecnico } = this.props;
    const {
      remove, update, success, error,
    } = this.state;
    return (
      <div className="admin-chamado-wrapper">
        <h1 className="admin-chamado">
          {'Editar '}
          <strong>{tecnico.nome}</strong>
        </h1>
        {success && <ErrorAlert className="success">{success}</ErrorAlert>}
        {error && <ErrorAlert className="error-atendimento-form">{error}</ErrorAlert>}
        <form onSubmit={this.handleSubmit} className="admin-chamado">
          {!remove && (
            <AtendimentoOption name="update" title="Atualizar" handle={this.handleUpdate} />
          )}
          {!update && (
            <AtendimentoOption name="remover" title="Remover" handle={this.handleRemove} />
          )}
          {update && (
            <>
              <div className="admin-chamado-input">
                <Input placeholder="Nome do tecnico" style={inputStyle} />
              </div>
              <div className="admin-chamado-input">
                <Input placeholder="Telefone do tecnico" style={inputStyle} />
              </div>
              <div className="admin-chamado-input">
                <Input type="email" placeholder="Email do tecnico" style={inputStyle} />
              </div>
              {tecnico.cargo !== 'A' && (
                <div className="admin-chamado-input">
                  <AtendimentoEncaminhar select={false} />
                </div>
              )}
            </>
          )}
          {(remove || update) && (
            <button type="submit" className="admin-chamado">
              Enviar
            </button>
          )}
        </form>
      </div>
    );
  }
}

GerenciamentoTecnicoForm.propTypes = {
  tecnico: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
