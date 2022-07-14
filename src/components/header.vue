<template>
  <view :class="m.header" :style="{ top: statusBarHeight }">
    <nut-icon
      :name="isBackToHome ? 'home' : 'back'"
      font-class-name="iconfont"
      class-prefix="icon"
      :class="m.icon"
      @click="back"
    ></nut-icon>
    <view :class="m.main">
      <slot></slot>
    </view>
  </view>
  <view v-if="isShowBlock" :class="m.block"> </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults } from 'vue'
import Taro from '@tarojs/taro'
// const emit = defineEmits(['search'])
const isBackToHome = ref(false)
const statusBarHeight = ref('20px')

withDefaults(
  defineProps<{
    isShowBlock?: boolean // 顶部标题是否占位
  }>(),
  {
    isShowBlock: true,
  }
)

onMounted(() => {
  const windowsInfo = Taro.getWindowInfo()
  const pages = Taro.getCurrentPages()
  isBackToHome.value = pages.length <= 1
  statusBarHeight.value = windowsInfo.statusBarHeight + 'px' || '20px'
})
const back = () => {
  if (isBackToHome.value) {
    Taro.reLaunch({ url: '/pages/index/index' })
    return
  }
  Taro.navigateBack()
}
</script>

<style lang="scss" module="m">
.header {
  position: fixed;
  left: 0;
  display: flex;
  align-items: center;
  height: 80rpx;
  width: 100vw;

  .icon {
    font-size: 40rpx;
    margin-left: 20rpx;
  }

  .main {
    flex: 1;
    height: 100%;
    margin-left: -60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
  }
}
.block {
  width: 100vw;
  height: calc(v-bind(statusBarHeight) + 80rpx);
}
</style>
