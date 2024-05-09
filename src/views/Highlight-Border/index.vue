<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const box = document.getElementById('box') as HTMLElement
  const cards = box.querySelectorAll('.card') as NodeListOf<HTMLElement>
  box.onmousemove = (e) => {
    for (const card of cards) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      card.style.setProperty('--x', `${x}px`)
      card.style.setProperty('--y', `${y}px`)
    }
  }
})
</script>
<template>
  <div class="highlightBorder flex-box">
    <div class="box" id="box">
      <div class="card">
        <div class="inner">1</div>
      </div>
      <div class="card">
        <div class="inner">2</div>
      </div>
      <div class="card">
        <div class="inner">3</div>
      </div>
      <div class="card">
        <div class="inner">4</div>
      </div>
      <div class="card">
        <div class="inner">5</div>
      </div>
      <div class="card">
        <div class="inner">6</div>
      </div>
      <div class="card">
        <div class="inner">7</div>
      </div>
      <div class="card">
        <div class="inner">8</div>
      </div>
      <div class="card">
        <div class="inner">9</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.highlightBorder {
  .box {
    width: 30rem;
    height: 30rem;
    display: flex;
    flex-wrap: wrap;
    .card {
      width: 9rem;
      height: 9rem;
      margin: 0.5rem;
      border-radius: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      color: #fff;
      background-color: rgba(255, 255, 255, 0.1);
      position: relative;
      overflow: hidden;
      .inner {
        position: absolute;
        background-color: #222;
        inset: 0.1rem;
        border-radius: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;
      }
    }
    .card::before {
      content: '';
      position: absolute;
      inset: 0;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: inherit;
      background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.6) 0, transparent);
      z-index: 2;
      transform: translate(var(--x, -10rem), var(--y, -10rem));
    }
  }
}
</style>
