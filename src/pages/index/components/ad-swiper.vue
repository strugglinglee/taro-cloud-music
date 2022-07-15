<template>
  <nut-swiper :pagination-visible="true" pagination-color="#426543" auto-play="3000">
    <nut-swiper-item v-for="item in adList" :key="item.bannerId">
      <img :src="item.pic" alt="" />
    </nut-swiper-item>
  </nut-swiper>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import request from '@/utils/request'

// const emit = defineEmits(['search'])

const adList = ref<unknown[]>([])

onMounted(async () => {
  interface BannerData {
    banners: unknown[]
  }
  const { banners } = await request<BannerData>({
    url: '/banner?type=2',
  })
  adList.value = banners
})
</script>

<style lang="scss">
.nut-swiper {
  margin: 10px;
  border-radius: 8px;
  min-height: 150px;
}
.nut-swiper-item {
  line-height: 150px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
