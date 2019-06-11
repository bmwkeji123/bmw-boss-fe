import axios from 'axios';
import { Dialog } from '@alifd/next';

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

    Dialog.confirm({
      title: '提示',
      content: '登录校验失败，是否跳去登录？',
      onOk: () => {
        location.hash = '/user/login';
      },
      onCancel: () => {},
    });

    return Promise.reject(error);

  }

  Dialog.alert({
    title: '系统出错了',
    content: `${JSON.stringify(error, null, 2)}`,
    onOk: () => {},
  });

  return Promise.reject(error);
});

export default instance;
