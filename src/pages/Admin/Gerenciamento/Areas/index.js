import React, { Component, Fragment } from 'react';

import AdminPageTitle from '../../../../components/Admin/Title';
import Card from '../../../../components/Admin/Card';
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
      <Fragment>
        <AdminPageTitle comment="comentário">Áreas</AdminPageTitle>
        <div className="admin-gerenciamento-areas">
          <button type="button" onClick={this.handleNovaArea}>
            {novaArea ? (
              <Fragment>
                Insira os dados da área
                {' '}
                <i className="fas fa-arrow-down" />
              </Fragment>
            ) : (
              <Fragment>
                Criar nova área
                {' '}
                <i className="fas fa-plus" />
              </Fragment>
            )}
          </button>
          {novaArea ? (
            <AdminForm handleSubmit={this.handleFormSubmit}>
              <Input type="text" placeholder="Nome" style={inputStyle} />
              <Input type="text" placeholder="Nome" style={inputStyle} />
              <Input type="text" placeholder="Nome" style={inputStyle} />
              <Input type="text" placeholder="Nome" style={inputStyle} />
              <button type="submit">Enviar</button>
            </AdminForm>
          ) : null}
          <div className="cards-wrapper">
            <Card info={{ title: 'titulo', chamados: '1000' }} url="/admin/gerenciamento/areas" />
            <Card info={{ title: 'titulo', chamados: '1000' }} url="/admin/gerenciamento/areas" />
            <Card info={{ title: 'titulo', chamados: '1000' }} url="/admin/gerenciamento/areas" />
            <Card info={{ title: 'titulo', chamados: '1000' }} url="/admin/gerenciamento/areas" />
            <Card info={{ title: 'titulo', chamados: '1000' }} url="/admin/gerenciamento/areas" />
          </div>
        </div>
      </Fragment>
    );
  }
}
