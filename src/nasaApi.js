import axios from 'axios';

const nasaUrl = 'https://api.nasa.gov';

const nasaApi = axios.create({
  baseURL: nasaUrl,
  params: {
    'api_key': '2pKT3ufIjb0ydYEPPTloabCfp5MOfxqhcAfEu7F2'
  }
});

nasaApi.interceptors.response.use((response) => response, (error) => {
  console.log(error);
})

export default nasaApi;