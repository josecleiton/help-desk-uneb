import React from 'react';
import { Redirect } from 'react-router-dom';

const AdminSair = () => {
  localStorage.removeItem('HD7-AuthToken');
  localStorage.removeItem('HD7-AuthTokenExpire');
  return <Redirect to="/login" />;
};

export default AdminSair;
