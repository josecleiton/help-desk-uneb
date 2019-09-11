import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../../../../services/api';

import AdminRightDiv from '../../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../../components/Admin/Title';

export default class GerenciamentoSetor extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { nome },
      },
    } = props;
    this.state = {
      error: '',
      setor: null,
      nome,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { nome } = this.state;
    if (location && location.state && location.state.payload) {
      const {
        state: { payload: setor },
      } = location;
      this.setState({ setor });
      console.log(setor);
    } else {
      api.post('/api/setor/read.php', { nome }).then((res) => {
        console.log(res.data)
        if (!res.data.error) {
          this.setState({ setor: res.data });
        } else {
          this.setState({ error: res.data.mensagem });
        }
      });
    }
  }

  render() {
    const { nome } = this.state;
    return (
      <AdminRightDiv>
        <AdminPageTitle comment="comentário">Setores</AdminPageTitle>
        <div>{nome}</div>
      </AdminRightDiv>
    );
  }
}

GerenciamentoSetor.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
