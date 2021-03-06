import { createApp } from 'vue'
import './app.scss'
//https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.20&manage_type=myprojects&projectId=3517513
import './assets/font/iconfont.css'
import Taro from '@tarojs/taro'
import { setupStore, useSystem } from '@/stores'
import {
  Button,
  Cell,
  Icon,
  Form,
  FormItem,
  CellGroup,
  Swiper,
  SwiperItem,
  Grid,
  GridItem,
  Navbar,
  ConfigProvider,
} from '@nutui/nutui-taro'

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
  .use(Button)
  .use(Cell)
  .use(Icon)
  .use(Form)
  .use(FormItem)
  .use(CellGroup)
  .use(Form)
  .use(Swiper)
  .use(SwiperItem)
  .use(Grid)
  .use(GridItem)
  .use(Navbar)
  .use(ConfigProvider)

setupStore(App)
export default App
