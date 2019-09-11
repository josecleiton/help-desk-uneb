
import axios from 'axios';

const jwtToken = localStorage.getItem('HD7-AuthToken');
// console.log(jwtToken);

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Authorization': `Bearer ${jwtToken}` },
});

export default api;