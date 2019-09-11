import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const AdminPageTitle = (props) => {
  const { children, comment } = props;
  return (
    <div className="admin-page-title">
      <h2>{children}</h2>
      {comment && <h3>{comment}</h3>}
    </div>
  );
};

AdminPageTitle.defaultProps = {
  comment: '',
};

AdminPageTitle.propTypes = {
  children: PropTypes.string.isRequired,
  comment: PropTypes.string,
};

export default AdminPageTitle;
