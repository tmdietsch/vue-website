import axios from 'axios';

const apiUrl = 'http://localhost:8080';

const bookApi = axios.create({ 
  baseURL: apiUrl, 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080'
  }
});

export default bookApi;