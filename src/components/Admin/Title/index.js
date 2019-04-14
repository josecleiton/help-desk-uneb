import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const AdminPageTitle = (props) => {
  const { title, comment } = props;
  return (
    <div className="admin-page-title">
      <h2>{title}</h2>
      <h3>{comment}</h3>
    </div>
  );
};

AdminPageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default AdminPageTitle;
