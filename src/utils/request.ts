import axios, { AxiosRequestConfig, AxiosResponse } from 'taro-axios'
import { showToast } from './utils'

const baseURL = 'https://cloud-music-api-alpha.vercel.app'

const instance = axios.create({
  // 超时时间 1 分钟
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // const token = '111'
  config.headers = {
    // Authorization: `Bearer ${token}`,
    // token,
    ...config.headers,
  }
  return { ...config, baseURL }
})

const showMessage = (title: string) => {
  const message = JSON.stringify(title).replace(/"/g, '')
  // TODO Request failed with status code 500 优化展示逻辑
  if (message.indexOf('Network') > -1) {
    showToast('请求失败，请联系客服')
  } else if (message.indexOf('timeout') > -1) {
    showToast('请求超时')
  } else {
    showToast(message)
  }
}
interface ApiResult<T> {
  code: number
  status?: number
  data: T
}
// Taro.showToast 和loading 是单例 所以只有成功时候hideLoading 其他情况showToast
export default function request<T>(options: AxiosRequestConfig = {}) {
  return new Promise<T>((resolve, reject) => {
    instance(options)
      .then((response: AxiosResponse<ApiResult<T>>) => {
        if (response?.status === 200 && response?.data?.code === 200) {
          resolve(response.data)
        } else {
          throw response
        }
      })
      .catch((result) => {
        if (result?.status === 200 && result?.data?.code === -1) {
          //重新登陆 result?.data?.code === -1 ||
        } else {
          // 其他情况 code 非 0 情况 有 message 就显示
          showMessage(result?.data?.message ?? result?.message)
        }
        reject(result)
      })
  })
}
