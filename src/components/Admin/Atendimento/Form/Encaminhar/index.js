import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../../../../services/api';
import Loading from '../../../../Loading';

export default class AtendimentoEncaminhar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setores: null,
      selected: false,
      tecnicos: null,
    };
  }

  componentDidMount() {
    api.get('/api/setor/read.php').then((res) => {
      // console.log(res.data);
      if (!res.data.error) {
        this.setState({ setores: res.data });
      } else {
        console.log(res.data);
      }
    });
  }

  handleChange = (e) => {
    const selected = e.target.value;
    const { select } = this.props;
    if (selected && select) {
      const formData = {};
      if (selected === 'Outros') {
        formData.privilegiados = true;
      } else {
        formData.setor = selected;
      }
      api.post('/api/tecnico/read.php', formData).then((res) => {
        if (!res.data.error) {
          this.setState({ selected, tecnicos: res.data });
        }
      });
      return;
    }
    this.setState({ selected: false });
  };

  render() {
    const { setores, selected, tecnicos } = this.state;
    return setores ? (
      <>
        <strong>Setor</strong>
        <select id="encaminha-setor" className="admin-chamado" onChange={this.handleChange}>
          <option value="">{setores ? '-----' : 'Loading...'}</option>
          {(setores || []).map(setor => (
            <option value={setor.nome} key={setor.nome}>
              {setor.nome}
            </option>
          ))}
          <option value="Outros">Outros</option>
        </select>
        {selected && (
          <>
            <strong>Técnico</strong>
            <select id="encaminha-tecnico" className="admin-chamado">
              <option value="">{tecnicos ? '-----' : 'Loading...'}</option>
              {(tecnicos || []).map(tecnico => (
                <option value={tecnico.login} key={tecnico.login}>
                  {tecnico.nome}
                </option>
              ))}
            </select>
          </>
        )}
      </>
    ) : (
      <Loading size="5%" />
    );
  }
}

AtendimentoEncaminhar.propTypes = {
  select: PropTypes.bool,
};
AtendimentoEncaminhar.defaultProps = {
  select: true,
};
