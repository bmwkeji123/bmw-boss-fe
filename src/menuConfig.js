// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
];

const asideMenuConfig = [
  {
    name: '录单',
    path: '/order/create',
    icon: 'publish',
  },
  {
    name: '订单列表',
    path: '/order/list',
    icon: 'ul-list',
  },
  /* {
    name: '对帐结算',
    path: '/contract/my',
    icon: 'coupons',
  }, */
];

export { headerMenuConfig, asideMenuConfig };
