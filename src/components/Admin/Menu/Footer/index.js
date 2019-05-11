import React from 'react';
import PropTypes from 'prop-types';

const AdminFooter = ({ expand }) => (
  <div className="menu-footer">
    &copy; 2019
    {' '}
    <a
      href="https://github.com/josecleiton"
      target="_blank"
      rel="noopener noreferrer"
      title="GitHub"
    >
      <strong>{expand ? 'JOSÉ CLEITON' : 'JC'}</strong>
    </a>
    {' '}
    &&
    {' '}
    <a
      href="https://github.com/Daanilo-s19"
      target="_blank"
      rel="noopener noreferrer"
      title="GitHub"
    >
      <strong>{expand ? 'DANILO NASCIMENTO' : 'DN'}</strong>
    </a>
  </div>
);

AdminFooter.propTypes = {
  expand: PropTypes.bool.isRequired,
};

export default AdminFooter;
