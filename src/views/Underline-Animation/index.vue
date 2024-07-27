<script lang="ts" setup></script>
<template>
  <div class="flex-box">
    <div class="title">
      <span
        >短暂的快乐会带来无穷无尽的痛苦，是为了对抗空虚寻找快乐。所以人们可以自由选择，也可以自由的不去选，你可以自由的去爱，也可以自由的不去爱，但是你要勇敢的承受这种行为后果。所有的快乐都意味着艰辛的努力，快乐只是责任的副产品，脱离责任去追求快乐最后得到的一定是痛苦。
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.title {
  width: 30rem;
  line-height: 2;
  span {
    background: linear-gradient(to right, #f02fc2, #6094ea) no-repeat right bottom;
    background-size: 0 2px;
    transition: background-size 1.5s;
  }
  span:hover {
    background: linear-gradient(to right, #f02fc2, #6094ea) no-repeat left bottom;
    background-size: 100% 2px;
  }
}
</style>
