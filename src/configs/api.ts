import axios from 'axios';
// import useAuth from '../hooks/useAuth';
// import {useEffect} from 'react';



const api = axios.create({
  baseURL: import.meta.env.VITE_EIVU_SERVER_HOST + '/api/frontend/v1/',
  headers: {
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + import.meta.env.VITE_EIVU_JWT
  },
  params: {
    keyFormat: 'camel_lower',
    delicate: false
  }
});

export default api;