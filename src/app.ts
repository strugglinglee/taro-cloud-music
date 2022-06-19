import { createApp } from 'vue'
import './app.scss'

import Taro from '@tarojs/taro'
import { setupStore, useSystem } from '@/stores'

const App = createApp({
  // 对应 onLaunch
  onLaunch(options) {
    // 将启动参数放进到全局去
    const system = useSystem()
    system.init(options)
    system.setInfo(Taro.getSystemInfoSync())
  },
  // onShow(options) {
  //   console.log(options)
  // },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

setupStore(App)
export default App
