import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import AdminMenu from '../../../components/Admin/Menu';
import AdminRightDiv from '../../../components/Admin/RightDiv';
import AdminPageTitle from '../../../components/Admin/Title';
import LargeBox from '../../../components/LargeBox';
import SortArrow from '../../../components/LargeBox/SortArrow';
import AtendimentoForm from '../../../components/Admin/Atendimento/Form';
import Content from './Content';

import './style.css';

const HiddenContent = () => (
  <h3 className="hidden-content-box">
    Descrição do chamado oculta, clique na seta para mais informações.
  </h3>
);

export default class Atendimento extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false, content: <HiddenContent /> };
  }

  currentPath = () => {
    const {
      match: { path },
    } = this.props;
    return path.substr(0, path.lastIndexOf('/'));
  };

  slide = (clicked) => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ clicked });
    if (clicked) {
      this.setState({ content: <Content id={id} /> });
    } else {
      this.setState({ content: <HiddenContent /> });
    }
  };

  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { clicked, content } = this.state;
    return (
      <Fragment>
        <AdminMenu path={this.currentPath} />
        <AdminRightDiv>
          <AdminPageTitle>Atendimento de Chamado</AdminPageTitle>
          <LargeBox className={clicked ? 'admin-atendimento-box-clicked' : 'admin-atendimento-box'}>
            <div className="admin-atendimento-sort-arrow">
              <SortArrow slide={this.slide} />
            </div>
            {content}
          </LargeBox>
          <AtendimentoForm chamadoId={id} />
        </AdminRightDiv>
      </Fragment>
    );
  }
}

Atendimento.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
