<script lang="ts" setup></script>
<template>
  <div class="flex-box">
    <div class="title text-9xl bg-clip-text text-transparent">SCSS 星空</div>
    <div class="layer1 fixed w-1 h-1 bg-white rounded-full"></div>
    <div class="layer2 fixed w-1 h-1 bg-white rounded-full"></div>
    <div class="layer3 fixed w-1 h-1 bg-white rounded-full"></div>
    <div class="layer4 fixed w-1 h-1 bg-white rounded-full"></div>
    <div class="layer5 fixed w-1 h-1 bg-white rounded-full"></div>
  </div>
</template>
<style lang="scss" scoped>
@function getShadows($n) {
  $shadows: '#{random(100)-50}vw #{random(100) - 50}vh #f1f1f1';
  @for $i from 2 through $n {
    $shadows: '#{$shadows}, #{random(100)-50}vw #{random(100) - 50}vh #f1f1f1';
  }
  @return unquote($shadows);
}

@keyframes move-up {
  to {
    transform: translateY(-100vh);
  }
}
.title {
  z-index: 2;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2));
}

$duration: 20s;
$count: 200;

@for $i from 1 through 5 {
  .layer#{$i} {
    box-shadow: getShadows(floor(calc($count / $i)));
    animation: move-up #{$duration * $i} linear infinite;
    opacity: unquote('#{100 - 15 * $i}%');
    &::after {
      content: '';
      position: fixed;
      width: inherit;
      height: inherit;
      left: 0;
      top: 100vh;
      border-radius: inherit;
      box-shadow: inherit;
      opacity: inherit;
    }
  }
}
</style>
