import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AdminMenu from '../../../components/Admin/Menu';
import AdminPageTitle from '../../../components/Admin/Title';
import AdminTable from '../../../components/Admin/Table';
import AdminRightDiv from '../../../components/Admin/RightDiv';

export default class AdminHome extends Component {
  currentPath = () => {
    const {
      match: { path },
    } = this.props;
    return path;
  };

  render() {
    const {
      history: { push },
    } = this.props;
    return (
      <Fragment>
        <AdminMenu path={this.currentPath} />
        <AdminRightDiv>
          <AdminPageTitle comment="comentário">Painel Administrativo</AdminPageTitle>
          <AdminTable
            title="Chamados em aberto"
            margin="1.5% auto"
            redirect={push}
            goToUrl="/admin/atendimento"
            rowsPrimaryKey={0}
            head={[
              '#',
              'Área',
              'Situação',
              'Problema',
              'Qtd de dias',
              'Data de Abertura',
              'Solicitante',
            ]}
            rows={[
              [
                '190001',
                'TI',
                'Em aberto',
                'Java bugou',
                'X',
                'dd/mm/YYYY',
                'brancobro@yahoo.com.br',
              ],
              [
                '190002',
                'TI',
                'Em atendimento',
                'Impressora sem papel',
                'X',
                'dd/mm/YYYY',
                'rafamoreira@777.com',
              ],
            ]}
          />
        </AdminRightDiv>
      </Fragment>
    );
  }
}

AdminHome.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
