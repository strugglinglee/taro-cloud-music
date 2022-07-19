<template>
  <view class="mv-detail">
    <video
      v-if="detail.url"
      class="video"
      :src="detail.url"
      initial-time="0"
      autoplay="true"
      loop="false"
      muted="false"
      direction="0"
      object-fit="cover"
    ></video>
  </view>
</template>

<script setup>
import request from '@/utils/request'
import { onMounted, ref } from 'vue'
import Taro from '@tarojs/taro'
import './index.scss'
const detail = ref([])
onMounted(() => {
  const id = Taro.Current.router?.params?.id
  getDetail(id)
})

const getDetail = async (id) => {
  if (!id) return

  // const { data } = await request({
  //   url: `/mv/detail?mvid=${id}`,
  // })
  const {
    data: { url },
  } = await request({
    url: `/mv/url?id=${id}`,
  })
  detail.value.url = url
}
</script>
