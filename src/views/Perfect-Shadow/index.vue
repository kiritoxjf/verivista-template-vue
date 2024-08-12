<script setup lang="ts" name="perfect-shadow">
import { ref } from 'vue'

const type = ref<'normal' | 'perfect'>('normal')
</script>
<template>
  <div class="perfect-shadow flex-box">
    <div class="btn-box">
      <button
        @click="
          () => {
            type = 'normal'
          }
        "
      >
        常规阴影
      </button>
      <button
        @click="
          () => {
            type = 'perfect'
          }
        "
      >
        完美阴影
      </button>
    </div>
    <img :class="type" src="./img.png" alt="" />
  </div>
</template>
<style scoped lang="less">
.perfect-shadow {
  flex-direction: column;
  .btn-box {
    display: flex;
    gap: 1rem;
    button {
      margin-bottom: 2rem;
      padding: 5px 10px;
      background-color: transparent;
      cursor: pointer;
      box-shadow: 0 0 20px rgba(222, 222, 222, 0.5);
    }
  }
  .normal {
    box-shadow: 0 0 20px rgba(222, 222, 222, 0.5);
  }
  .perfect {
    filter: drop-shadow(0 0 20px rgba(222, 222, 222, 0.5));
  }
}
</style>
