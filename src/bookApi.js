import axios from 'axios';

const bookUrl = 'http://localhost:5000';

const bookApi = axios.create({ 
  baseURL: bookUrl, 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:5000'
  }
});

bookApi.interceptors.response.use((response) => response, (error) => {
  console.log(error);
})

export default bookApi;