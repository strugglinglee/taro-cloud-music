<template>
  <view class="songs">
    <nut-cell class="songs-inner">
      <view class="title">
        推荐歌单
      </view>
      <nut-grid>
        <nut-grid-item icon="dongdong" text="文字1"></nut-grid-item>
        <nut-grid-item icon="dongdong" text="文字2"></nut-grid-item>
        <nut-grid-item icon="dongdong" text="文字3"></nut-grid-item>
        <nut-grid-item icon="dongdong" text="文字4"></nut-grid-item>
      </nut-grid>
    </nut-cell>
  </view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import request from '@/utils/request'

// const emit = defineEmits(['search'])

onMounted(async () => {
  const { data } = await request({
    url: '/personalized',
  })
  console.log(data)
})
</script>

<style lang="scss">
.songs {
  margin: 10px;

  &-inner {
    flex-direction: column;
  }
}

.title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}
</style>
