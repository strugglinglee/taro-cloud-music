import Taro from '@tarojs/taro'
import { defineStore } from 'pinia'

const useUserInfo = defineStore({
  /** 区分不通状态的唯一标识 */
  id: 'user',
  /** 状态 */
  state: () => ({
    info: JSON.parse(Taro.getStorageSync('userInfo')) || '',
  }),
  actions: {
    init() {
      this.info = {}
    },
  },
})
export { useUserInfo }
