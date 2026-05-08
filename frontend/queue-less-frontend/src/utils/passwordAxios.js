//src/utils/passwordAxios.js
import axios from 'axios';

const passwordAxios = axios.create({
  baseURL: '/api/password',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default passwordAxios;
