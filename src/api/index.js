import axios from 'axios';

const api = axios.create({
  baseURL: 'https://local.nomin.mn/service/',
});

api.defaults.headers.post['Content-Type'] = 'application/json';
export default api;
