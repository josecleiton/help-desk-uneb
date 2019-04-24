import React, { Component } from 'react';

import AdminRightDiv from '../../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../../components/Admin/Title';
import Deck from '../../../../components/Admin/Deck';
import Input from '../../../../components/Input';
import AdminForm from '../../../../components/Admin/Form';

import './style.css';

const inputStyle = {
  padding: '5px',
  border: '1px solid rgba(0,0,0,0.3)',
  display: 'block',
  margin: '10px auto',
  width: '95%',
};
export default class GerenciamentoAreas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novaArea: false,
    };
  }

  handleNovaArea = () => {
    const { novaArea } = this.state;
    this.setState({ novaArea: !novaArea });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  render() {
    const { novaArea } = this.state;
    return (
      <AdminRightDiv>
        <AdminPageTitle comment="comentário">Áreas</AdminPageTitle>
        <div className="admin-gerenciamento-areas">
          <button type="button" onClick={this.handleNovaArea}>
            {novaArea ? (
              <>
                Insira os dados da área
                {' '}
                <i className="fas fa-arrow-down" />
              </>
            ) : (
              <>
                Criar nova área
                {' '}
                <i className="fas fa-plus" />
              </>
            )}
          </button>
          {novaArea && (
            <AdminForm handleSubmit={this.handleFormSubmit}>
              <Input type="text" placeholder="Nome" style={inputStyle} />
              <Input type="text" placeholder="Nome" style={inputStyle} />
              <Input type="text" placeholder="Nome" style={inputStyle} />
              <Input type="text" placeholder="Nome" style={inputStyle} />
              <button type="submit">Enviar</button>
            </AdminForm>
          )}
          <Deck
            cards={[
              { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/areas' },
              { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/areas' },
              { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/areas' },
              { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/areas' },
              { info: { title: 'titulo', chamados: '1000' }, url: '/admin/gerenciamento/areas' },
            ]}
          />
        </div>
      </AdminRightDiv>
    );
  }
}
