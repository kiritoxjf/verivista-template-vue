<script setup lang="ts" name="refection-carousel">
const images: string[] = [
  'https://images.wallpaperscraft.com/image/single/sakura_art_sky_122545_480x800.jpg',
  'https://images.wallpaperscraft.com/image/single/piano_silhouette_space_156662_480x800.jpg',
  'https://images.wallpaperscraft.com/image/single/creature_mystical_fantastic_139179_480x800.jpg',
  'https://images.wallpaperscraft.com/image/single/torii_art_solitude_129792_480x800.jpg',
  'https://images.wallpaperscraft.com/image/single/city_aerial_view_road_156925_480x800.jpg',
  'https://images.wallpaperscraft.com/image/single/japan_shirakawa_houses_112963_480x800.jpg'
]
</script>

<template>
  <div class="refection-carousel flex-box">
    <div class="carousel-container">
      <div class="card" v-for="(image, index) in images" :key="index" :style="`--i: ${index}`">
        <img :src="image" :alt="image" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@keyframes rotate {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
.refection-carousel {
  position: relative;
  perspective: 200rem; // 视图深度
  overflow: hidden;
  .carousel-container {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d; // 3d 布局
    animation: rotate 15s linear infinite; // 旋转容器
  }
  .carousel-container:hover {
    animation-play-state: paused; // 动画暂停
  }
  .card {
    display: inline-flex;
    position: absolute;
    width: 10rem;
    border: 0.2rem solid rgba(217, 217, 217, 0.5);
    border-radius: 2rem;
    overflow: hidden;
    -webkit-box-reflect: below 0.5rem
      linear-gradient(transparent 60%, transparent, rgba(0, 0, 0, 0.4));
    transform: rotateY(calc(var(--i) * 60deg)) translateZ(20rem);
    img {
      width: 100%;
      height: calc(100% * 5 / 3);
    }
  }
}
</style>
