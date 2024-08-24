<script setup lang="ts" name="index">
import { routes } from '@/router'
import { useRouter } from 'vue-router'

const navigate = useRouter()
</script>

<template>
  <div class="flex flex-1">
    <div v-for="route in routes" :key="route.name">
      <div
        class="flex justify-center items-center h-4 m-2 p-4 border rounded-md bg-blue-dark cursor-pointer hover:bg-blue"
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
