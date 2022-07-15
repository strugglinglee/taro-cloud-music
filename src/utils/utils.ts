import Taro from '@tarojs/taro'

export const showToast = (title: string) => {
  Taro.showToast({
    title,
    icon: 'none',
    duration: 3000,
  })
}

// 防抖函数
export const debounce = function(fn, delay = 100) {
  type Timeout = ReturnType<typeof setTimeout> | null
  let timer: Timeout = null
  return function() {
    const context = this
    // eslint-disable-next-line prefer-rest-params
    const args: IArguments = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}

// 节流函数
export const throttle = function(fn, interval = 100) {
  let last = 0
  return function() {
    const context = this
    // eslint-disable-next-line prefer-rest-params
    const args: IArguments = arguments
    const now = +new Date()
    if (now - last >= interval) {
      last = now
      fn.apply(context, args)
    }
  }
}
