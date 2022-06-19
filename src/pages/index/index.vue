<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSystem } from '@/stores'
import './index.scss'

const msg = ref('Hello world .')

onMounted(() => {
  const sys = useSystem()
  console.log(sys.options, 'sys')
})
</script>
