import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../../../../services/api';

// import AtendimentoContext from '../../Context';
import AtendimentoOption from '../../Option';
import TextArea from '../../../../TextArea';
import AtendimentoEncaminhar from '../Encaminhar';
import ErrorAlert from '../../../../ErrorAlert';
import AtendimentoPrioridade from '../Prioridade';

export default class AtendimentoFormEmAtendimento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encaminhar: false,
      pendente: false,
      concluido: false,
      error: '',
      success: '',
    };
  }

  handleEncaminhar = (checked) => {
    this.setState({ encaminhar: checked });
  };

  handlePendente = (checked) => {
    this.setState({ pendente: checked });
  };

  handleConcluido = (checked) => {
    this.setState({ concluido: checked });
  };

  handleSubmit = (el) => {
    el.preventDefault();
    const { encaminhar, pendente, concluido } = this.state;
    const textArea = document.querySelector('textarea');
    const formData = { id: this.props.payload.id, situacao: 'Em Atendimento' };
    if (encaminhar) {
      formData.nova_situacao = 'Transferido';
      const priorityEl = document.getElementById('prioridade');
      const priorityVal = priorityEl.options[priorityEl.selectedIndex].value;
      if (!priorityVal) {
        this.setState({ error: 'Você deve selecionar uma prioridade para este chamado!' });
        return;
      }
      formData.prioridade = priorityVal;
      const encaminharSetorEl = document.getElementById('encaminha-setor');
      const encaminhaSetorVal = encaminharSetorEl.options[encaminharSetorEl.selectedIndex].value;
      if (!encaminhaSetorVal) {
        this.setState({ error: 'Você deve selecionar um setor para encaminhar este chamado!' });
        return;
      }
      const tecnicoEl = document.getElementById('encaminha-tecnico');
      const tecnicoVal = tecnicoEl.options[tecnicoEl.selectedIndex].value;
      formData.novo_setor = encaminhaSetorVal;
      if (tecnicoVal) {
        formData.novo_tecnico = tecnicoVal;
      }
      // console.log(formData);
      // return;
    } else if (pendente) {
      formData.nova_situacao = 'Pendente';
      formData.descricao = textArea.value;
    } else if (concluido) {
      formData.nova_situacao = 'Concluido';
    }
    const jwtToken = localStorage.getItem('HD7-AuthToken');
    api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    // console.log(jwtToken);
    console.log(formData);
    api
      .post('/api/chamado/update.php', formData)
      .then((res) => {
        console.log(res);
        if (!res.data.error) {
          this.setState({ success: res.data.mensagem, error: '' }, () => {
            const { history } = this.props;
            setTimeout(() => {
              history.push('/admin');
            }, 1000);
          });
        } else {
          this.setState({ error: res.data.mensagem });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: 'Erro no Servidor' });
      });
  };

  render() {
    const {
      encaminhar, pendente, concluido, success, error,
    } = this.state;
    const { payload } = this.props;
    return (
      <div className="admin-chamador-wrapper">
        <h1 className="admin-chamado">
          {`Atendimento #${payload.id}`}
        </h1>
        {success && <ErrorAlert className="success">{success}</ErrorAlert>}
        {error && <ErrorAlert className="error-atendimento-form">{error}</ErrorAlert>}
        <form onSubmit={this.handleSubmit} className="admin-chamado">
          {!pendente && !concluido && (
            <>
              <AtendimentoOption
                name="encaminhar"
                title="Encaminhar"
                handle={this.handleEncaminhar}
              />
              {encaminhar && (
                <div className="admin-chamado-input">
                  <AtendimentoEncaminhar />
                  <AtendimentoPrioridade />
                  {/* <p style={{marginTop: 10}}><AtendimentoPrioridade /></p> */}
                  <button type="submit" className="admin-chamado">
                    Encaminhar
                  </button>
                </div>
              )}
            </>
          )}
          {!concluido && !encaminhar && (
            <>
              <AtendimentoOption
                name="pendente"
                title="Falta recurso"
                handle={this.handlePendente}
              />
              {pendente && (
                <TextArea
                  placeholder="Insira quais recursos faltam para a resolução do chamado."
                  required
                  style={{ width: '100%' }}
                />
              )}
            </>
          )}
          {!pendente && !encaminhar && (
            <AtendimentoOption
              name="concluir"
              title="Concluir chamado"
              handle={this.handleConcluido}
            />
          )}
          {!encaminhar && (
            <div className="admin-chamado-input">
              <button type="submit" className="admin-chamado">
                {!concluido ? 'Atender' : 'Concluir'}
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

AtendimentoFormEmAtendimento.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
