<template>
  <view class="header">
    <view class="icon" @click="back">&lt;</view>
    <view class="title">
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Taro from '@tarojs/taro'
// const emit = defineEmits(['search'])

onMounted(async () => {})
const back = () => {
  Taro.navigateBack()
}
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: flex-end;
  height: 150rpx;
  padding: 0 20rpx;

  .icon {
    width: 50rpx;
    height: 50rpx;
    font-size: 30rpx;
  }

  .title {
  }
}
</style>
