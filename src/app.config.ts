export default defineAppConfig({
  pages: ['pages/index/index', 'pages/login/index', 'pages/mine/index', 'pages/list/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    selectedColor: '#E20000',
    color: '#888',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'static/images/tabbar-home.png',
        selectedIconPath: 'static/images/tabbar-home-active.png',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'static/images/tabbar-mine.png',
        selectedIconPath: 'static/images/tabbar-mine-active.png',
      },
    ],
  },
})
