// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import OrderCreatePage from './pages/order/Create';
import OrderListPage from './pages/order/List';

const routerConfig = [
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/user/register',
    component: UserRegister,
  },
  {
    path: '/order/create',
    component: OrderCreatePage,
  },
  {
    path: '/order/list',
    component: OrderListPage,
  },
];

export default routerConfig;
