import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const ZuckAxios = axios.create({
  withCredentials: true,
  baseURL: REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default ZuckAxios;
