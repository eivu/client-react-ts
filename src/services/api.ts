import axios from 'axios';
import { v4 as uuid } from 'uuid'

const clientUuid = () => {
  if (!localStorage.getItem('clientUuid')) {
    localStorage.setItem('clientUuid', uuid());
  }
  return localStorage.getItem('clientUuid');
}

localStorage.getItem('clientUuid') || uuid();

const api = axios.create({
  baseURL: import.meta.env.VITE_EIVU_SERVER_HOST + '/api/frontend/v1/',
  headers: {
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + import.meta.env.VITE_EIVU_JWT
  },
  params: {
    keyFormat: 'camel_lower',
    delicate: false,
    clientUuid: clientUuid()
  }
});

export default api;