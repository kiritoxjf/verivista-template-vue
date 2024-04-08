<script setup lang="ts" name="index">
import { routes } from '@/router'
import { useRouter } from 'vue-router'

const navigate = useRouter()
</script>

<template>
  <div class="navigation">
    <div v-for="route in routes" :key="route.name">
      <div
        class="card"
        v-if="route.path !== '/navigation' && route.path !== '/'"
        @click="
          () => {
            navigate.push(route.path)
          }
        "
      >
        {{ route.meta?.title }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.navigation {
  display: flex;
  flex: 1;
  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    margin: 1rem;
    padding: 1rem;
    border: 0.1rem solid #eae5e3;
    border-radius: 1rem;
    background-color: #106898;
    cursor: pointer;
  }
  .card:hover {
    background-color: #06436f;
  }
}
</style>
