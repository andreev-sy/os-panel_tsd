import axios from 'react-native-axios';

const axiosInstance = axios.create({
  baseURL: 'http://135.181.78.213:1333',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': '6480b30c9f284004ae8d193547a2269b',
  },
});

export default axiosInstance;