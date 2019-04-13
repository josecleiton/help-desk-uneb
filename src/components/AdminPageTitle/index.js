import React from 'react';
import PropTypes from 'prop-types';

const AdminPageTitle = (props) => {
  const { title, comment } = props;
  return (
    <span className="admin-page-title">
      <h2>{title}</h2>
      <h3>{comment}</h3>
    </span>
  );
};

AdminPageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default AdminPageTitle;
