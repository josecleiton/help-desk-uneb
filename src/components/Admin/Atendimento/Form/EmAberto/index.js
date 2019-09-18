import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import {withRouter} from 'react-router-dom';
import api from '../../../../../services/api';

import AtendimentoOption from '../../Option';
import TextArea from '../../../../TextArea';
import AtendimentoTombamento from '../Tombamento';
import AtendimentoEncaminhar from '../Encaminhar';
import ErrorAlert from '../../../../ErrorAlert';
import AtendimentoPrioridade from '../Prioridade';

export default class AtendimentoFormEmAberto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tombamento: false,
      encaminhar: false,
      error: '',
      success: '',
    };
    this.id = '';
  }

  handleSubmit = (el) => {
    const { tombamento, encaminhar } = this.state;
    const {
      payload: { id },
      transferido,
    } = this.props;
    const formData = { id, situacao: transferido ? 'Transferido' : 'Em Aberto' };
    // const { payload } = this.props;
    el.preventDefault();
    if (!encaminhar) {
      formData.nova_situacao = 'Em Atendimento';
      // formData.novo_setor = payload.setor.nome;
      const textAreaEl = document.querySelector('div.admin-chamado-textarea textarea');
      const priorityEl = document.getElementById('prioridade');
      const priorityVal = priorityEl.options[priorityEl.selectedIndex].value;
      if (!priorityVal) {
        this.setState({ error: 'Você deve selecionar uma prioridade para este chamado!' });
        return;
      }
      formData.descricao = textAreaEl.value;
      formData.prioridade = priorityVal;
      if (tombamento) {
        const inputTombamento = document.querySelector('div.atendimento-tombamento input').value;
        if (inputTombamento.length < 5) {
          this.setState({ error: 'Tombo tem que ser maior que 4 caracteres' });
          return;
        }
        formData.tombo = inputTombamento;
      }
    } else {
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
    }
    // console.log('Dados do formulário: ', formData);
    const jwtToken = localStorage.getItem('HD7-AuthToken');
    api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
    // console.log(jwtToken);
    console.log(formData);
    api
      .post('/chamado/update.php', formData)
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

  handleTombamento = (checked) => {
    this.setState({ tombamento: checked });
  };

  handleEncaminhar = (checked) => {
    this.setState({ encaminhar: checked });
  };

  render() {
    const { encaminhar, error, success } = this.state;
    const {
      payload: { id },
      transferido,
    } = this.props;
    return (
      <div className="admin-chamado-wrapper">
        <h1 className="admin-chamado">
          {`Atendimento #${id}`}
        </h1>
        {success && <ErrorAlert className="success">{success}</ErrorAlert>}
        {error && <ErrorAlert className="error-atendimento-form">{error}</ErrorAlert>}
        <form onSubmit={this.handleSubmit} className="admin-chamado">
          {!encaminhar && (
            <div className="admin-chamado-textarea">
              <TextArea
                placeholder={`Informações adicionais sobre o chamado #${id}`}
                style={{ width: '100%', marginBottom: '10px' }}
              />
            </div>
          )}
          {!transferido && (
            <AtendimentoOption
              name="encaminhar"
              title="Encaminhar"
              handle={this.handleEncaminhar}
            />
          )}

          {!encaminhar ? (
            <>
              <AtendimentoOption
                name="tombamento"
                title="Tombamento de Patrimônio"
                handle={this.handleTombamento}
              >
                <AtendimentoTombamento />
              </AtendimentoOption>
              <div className="admin-chamado-input">
                <AtendimentoPrioridade />
                <button type="submit" className="admin-chamado">
                  Atender
                </button>
              </div>
            </>
          ) : (
            <div className="admin-chamado-input">
              <AtendimentoEncaminhar />
              <AtendimentoPrioridade />
              {/* <p style={{marginTop: 10}}><AtendimentoPrioridade /></p> */}
              <button type="submit" className="admin-chamado">
                Encaminhar
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

AtendimentoFormEmAberto.defaultProps = {
  transferido: false,
};

AtendimentoFormEmAberto.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  transferido: PropTypes.bool,
  payload: PropTypes.objectOf(PropTypes.any).isRequired,
};
