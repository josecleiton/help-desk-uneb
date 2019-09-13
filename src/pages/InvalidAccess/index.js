import React from 'react';
import PropTypes from 'prop-types';

import Error from '../../components/Error';

const InvalidAccess = (props) => {
  const { url } = props;
  return (
    <Error icon="far fa-angry" title="Acesso inválido!" url={url}>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque excepturi dolor reprehenderit
      deserunt ipsam, incidunt quae nam possimus iure odit accusantium recusandae dolore? Aperiam
      repellat, ex tempore iusto incidunt similique.
    </Error>
  );
};

InvalidAccess.propTypes = {
  url: PropTypes.string,
};

InvalidAccess.defaultProps = {
  url: '/',
};

export default InvalidAccess;
