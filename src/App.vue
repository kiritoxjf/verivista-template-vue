<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="less">
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 16px;
}
#app {
  display: flex;
  flex-direction: column;
  background-color: #000;
  color: #eae5e3;
}
</style>
