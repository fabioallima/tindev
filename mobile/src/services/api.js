import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:3333',
  baseURL: 'http://10.0.3.2:3333', //Simulador do Genymotion
});

export default api;
