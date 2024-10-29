<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  const paths = document.querySelectorAll('.p')
  paths.forEach((p) => {
    const l = (p as SVGGeometryElement).getTotalLength() + 1
    ;(p as SVGGeometryElement).style.setProperty('--l', l.toString())
  })
})
</script>
<template>
  <div class="flex-box">
    <svg
      t="1724488323669"
      viewBox="0 0 1024 1024"
      version="1.1"
      p-id="1490"
      width="200"
      height="200"
    >
      <path
        class="p"
        d="M857.7 485.5c-15.7 0-28.5 12.8-28.5 28.5v153c0 104-63.4 171.3-161.4 171.3H332.6c-98.1 0-161.4-67.2-161.4-171.3V351.2c0-104 63.4-171.2 161.4-171.2h142.1c15.7 0 28.5-12.8 28.5-28.5S490.5 123 474.8 123H332.6c-130.6 0-218.4 91.7-218.4 228.2V667c0 136.5 87.8 228.3 218.4 228.3h335.2c130.6 0 218.4-91.7 218.4-228.3V514c0-15.7-12.8-28.5-28.5-28.5z"
        p-id="1491"
      ></path>
      <path
        class="p"
        d="M321 515.9l-3.6 143.6c-0.2 7.7 2.7 15.1 8.1 20.6 5.4 5.5 12.7 8.6 20.4 8.6h142.2c29.6 0 57.5-11.5 78.4-32.5l285.2-285.3c22.5-22.5 34.9-52.4 34.9-84.2 0-31.8-12.4-61.7-34.9-84.2l-46.3-46.1c-46.4-46.4-121.9-46.3-168.3 0L353.4 440.2c-20.2 20.2-31.7 47.1-32.4 75.7z m444.3-319.1l46.3 46.1c11.7 11.7 18.1 27.2 18.1 43.8 0 16.6-6.4 32.2-18.2 43.9L788.2 354l-134-134 23.2-23.2c24.4-24.2 63.7-24.2 87.9 0zM378 517.3c0.3-13.9 5.9-27 15.8-36.8L614 260.3l134 134-221.7 221.6c-10.2 10.2-23.7 15.8-38.2 15.8h-113l2.9-114.4z"
        p-id="1492"
      ></path>
    </svg>
  </div>
</template>
<style lang="scss" scoped>
path {
  fill: none;
  stroke: #fff;
  stroke-width: 10;
  stroke-linecap: round;
  stroke-dasharray: var(--l);
  stroke-dashoffset: var(--l);
  animation: line 2s linear forwards;
}
@keyframes line {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
