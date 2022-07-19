export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/mine/index',
    'pages/list/index',
    'pages/song-detail/index',
    'pages/search/index',
    'pages/mv-detail/index',
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#333',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white',
  },
  tabBar: {
    selectedColor: '#E20000',
    color: '#ffffff',
    borderStyle: 'white',
    backgroundColor: '#333',
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
