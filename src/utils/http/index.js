import axios from 'axios';

const bmwToken = localStorage.getItem('bmwToken');
if (!bmwToken) {
  location.hash = '/user/login';
}

const instance = axios.create();

// axios.defaults.baseURL = 'https://api.example.com';

instance.defaults.headers.common['Authorization'] = `JWT ${bmwToken}`;

//instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401 || error.response.status === 403) {
    location.hash = '/user/login';
  }
  return Promise.reject(error);
});

export default instance;
