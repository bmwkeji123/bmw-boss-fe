import axios from 'axios';
import { Dialog } from '@alifd/next';

const instance = axios.create();

// axios.defaults.baseURL = 'https://api.example.com';

// 发送请求拦截器
instance.interceptors.request.use((config) => {

  // 设置JWT Token
  const bmwToken = localStorage.getItem('bmwToken');
  config.headers.Authorization = `JWT ${bmwToken}`;

  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应请求拦截器
instance.interceptors.response.use((response) => {
  return response.data;
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
