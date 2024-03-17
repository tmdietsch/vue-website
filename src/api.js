import axios from 'axios';

const apiUrl = 'http://localhost:8080/';

const bookApi = axios.create({ 
  baseURL: apiUrl, 
  timeout: 500
});

export default bookApi;