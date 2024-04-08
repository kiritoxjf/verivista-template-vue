<script setup lang="ts" name="index">
import { useRouter } from 'vue-router'

const navigate = useRouter()

navigate.push('/navigation')
</script>

<template>
  <div>跳转导航页</div>
</template>

<style lang="less" scoped></style>
